'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Check, X, Eye, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// Define the User type for TypeScript
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  dateJoined: string;
};

// The initial mock data
const initialUsers: User[] = [
  { id: 'USR-001', name: 'Karim Haddad', email: 'karim@farm.dz', role: 'Farmer', status: 'Active', dateJoined: '2026-01-15' },
  { id: 'USR-002', name: 'AgriPlus Ltd', email: 'contact@agriplus.dz', role: 'Factory Owner', status: 'Pending', dateJoined: '2026-02-18' },
  { id: 'USR-003', name: 'Amina Mansouri', email: 'amina.m@market.dz', role: 'Store Owner', status: 'Active', dateJoined: '2025-11-02' },
  { id: 'USR-004', name: 'Green Valley', email: 'hello@greenvalley.dz', role: 'Factory Owner', status: 'Rejected', dateJoined: '2026-02-10' },
  { id: 'USR-005', name: 'Yousef B.', email: 'yousef.b@farm.dz', role: 'Farmer', status: 'Pending', dateJoined: '2026-02-19' },
];

export default function UsersPage() {
  // --- 1. STATE MANAGEMENT ---
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  
  // Modals state
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', role: 'Farmer' });

  // Sorting state
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'asc' | 'desc' } | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3; // Set to 3 so we can see the pagination work with 5 mock users

  // Reset to page 1 if the user searches, filters, or sorts
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, sortConfig]);


  // --- 2. HANDLERS ---
  const handleApprove = (id: string) => {
    setUsers(users.map(user => user.id === id ? { ...user, status: 'Active' } : user));
  };

  const handleReject = (id: string) => {
    setUsers(users.map(user => user.id === id ? { ...user, status: 'Rejected' } : user));
  };

  const handleSort = (key: keyof User) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a mock ID (e.g. USR-006)
    const newId = `USR-${String(users.length + 1).padStart(3, '0')}`;
    // Get today's date formatted as YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    const newUser: User = {
      id: newId,
      name: newUserForm.name,
      email: newUserForm.email,
      role: newUserForm.role,
      status: 'Pending', // New users start as pending
      dateJoined: today,
    };

    setUsers([newUser, ...users]); // Add to top of list
    setIsAddUserModalOpen(false);
    setNewUserForm({ name: '', email: '', role: 'Farmer' }); // Reset form
  };


  // --- 3. DATA PROCESSING (Filter -> Sort -> Paginate) ---
  
  // A. Filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // B. Sort
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // C. Paginate
  const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  return (
    <div className="space-y-6 relative">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 mt-2">Manage all registered accounts</p>
        </div>
        <Button 
          className="bg-green-700 hover:bg-green-800 w-full sm:w-auto text-white"
          onClick={() => setIsAddUserModalOpen(true)}
        >
          <Plus size={18} className="mr-2" />
          Add User
        </Button>
      </div>

      <Card className="border-0 shadow-sm bg-white overflow-hidden">
        
        {/* Toolbar: Search & Filter */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or email..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Filter:</span>
            <select
              className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-4 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="All">All Roles</option>
              <option value="Farmer">Farmer</option>
              <option value="Factory Owner">Factory Owner</option>
              <option value="Store Owner">Store Owner</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {/* Clickable Sort Header: Name */}
                <th 
                  className="text-left py-3 px-6 font-semibold text-gray-700 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    User Details
                    {sortConfig?.key === 'name' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Role</th>
                
                {/* Clickable Sort Header: Date Joined */}
                <th 
                  className="text-left py-3 px-6 font-semibold text-gray-700 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('dateJoined')}
                >
                  <div className="flex items-center gap-1">
                    Date Joined
                    {sortConfig?.key === 'dateJoined' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Status</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">{user.name}</span>
                        <span className="text-sm text-gray-500">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-0">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">{user.dateJoined}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={
                        user.status === 'Active' ? 'outline' :
                        user.status === 'Rejected' ? 'destructive' : 'outline'
                      } className={
                        user.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100 border-transparent' :
                        user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-transparent' : ''
                      }>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.status === 'Pending' && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 h-8 w-8 p-0" onClick={() => handleApprove(user.id)}>
                              <Check size={16} />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 h-8 w-8 p-0" onClick={() => handleReject(user.id)}>
                              <X size={16} />
                            </Button>
                          </>
                        )}
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-gray-400 hover:text-green-700 hover:bg-green-50 h-8 w-8 p-0"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Eye size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
            <span className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to <span className="font-medium text-gray-900">{Math.min(startIndex + ITEMS_PER_PAGE, sortedUsers.length)}</span> of <span className="font-medium text-gray-900">{sortedUsers.length}</span> users
            </span>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-white"
              >
                <ChevronLeft size={16} className="mr-1"/> Prev
              </Button>
              <span className="text-sm font-medium text-gray-700 px-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="bg-white"
              >
                Next <ChevronRight size={16} className="ml-1"/>
              </Button>
            </div>
          </div>
        )}
      </Card>


      {/* ========================================= */}
      {/* MODAL 1: View User Details                */}
      {/* ========================================= */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">User Details</h2>
              <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4 border-b border-gray-50 pb-4">
                <span className="text-sm text-gray-500">Full Name</span>
                <span className="text-sm font-medium text-gray-900 col-span-2">{selectedUser.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-gray-50 pb-4">
                <span className="text-sm text-gray-500">Email Address</span>
                <span className="text-sm font-medium text-gray-900 col-span-2">{selectedUser.email}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-gray-50 pb-4">
                <span className="text-sm text-gray-500">User Role</span>
                <span className="col-span-2">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-0">{selectedUser.role}</Badge>
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-gray-50 pb-4">
                <span className="text-sm text-gray-500">Status</span>
                <span className="col-span-2">
                   <Badge variant={selectedUser.status === 'Active' ? 'outline' : selectedUser.status === 'Rejected' ? 'destructive' : 'outline'} className={selectedUser.status === 'Active' ? 'bg-green-100 text-green-800 border-transparent' : selectedUser.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-transparent' : ''}>
                      {selectedUser.status}
                    </Badge>
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-gray-50 pb-4">
                <span className="text-sm text-gray-500">Date Joined</span>
                <span className="text-sm font-medium text-gray-900 col-span-2">{selectedUser.dateJoined}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="text-sm text-gray-500">User ID</span>
                <span className="text-sm font-mono text-gray-600 col-span-2 bg-gray-50 px-2 py-1 rounded">{selectedUser.id}</span>
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
              <Button onClick={() => setSelectedUser(null)} variant="outline" className="bg-white">Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* MODAL 2: Add New User Form                */}
      {/* ========================================= */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Add New User</h2>
              <button onClick={() => setIsAddUserModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddUserSubmit}>
              <div className="p-6 space-y-4">
                
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. Samir B."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    value={newUserForm.name}
                    onChange={(e) => setNewUserForm({...newUserForm, name: e.target.value})}
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="samir@example.dz"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})}
                  />
                </div>

                {/* Role Select */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <select 
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({...newUserForm, role: e.target.value})}
                  >
                    <option value="Farmer">Farmer</option>
                    <option value="Factory Owner">Factory Owner</option>
                    <option value="Store Owner">Store Owner</option>
                  </select>
                </div>

              </div>
              
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <Button type="button" onClick={() => setIsAddUserModalOpen(false)} variant="outline" className="bg-white">
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-700 hover:bg-green-800 text-white">
                  Save User
                </Button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}