'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, MapPin, Activity, Calendar, Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Building2, Users, CheckCircle2, XCircle } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// Define the Factory type for TypeScript
type Factory = {
  id: number;
  name: string;
  location: string;
  capacity: string;
  status: string;
  manager: string;
  established: string;
  workforce: number;
};

// Initial mock data
const initialFactories: Factory[] = [
  { id: 1, name: 'Factory A', location: 'Cairo, Industrial Zone', capacity: '5000 tons/month', status: 'Active', manager: 'Osama El-Sayed', established: '2015', workforce: 120 },
  { id: 2, name: 'Factory B', location: 'Alexandria, Port Area', capacity: '3500 tons/month', status: 'Active', manager: 'Khaled Youssef', established: '2018', workforce: 85 },
  { id: 3, name: 'Factory C', location: 'Giza, South District', capacity: '2000 tons/month', status: 'Inactive', manager: 'Mahmoud Ali', established: '2020', workforce: 45 },
  { id: 4, name: 'AgriPlus Ltd', location: 'Rouiba, Algiers', capacity: '8000 tons/month', status: 'Pending', manager: 'Samir L.', established: '2019', workforce: 200 },
  { id: 5, name: 'Green Valley Processing', location: 'Oran, Industrial Park', capacity: '1500 tons/month', status: 'Active', manager: 'Yousef B.', established: '2022', workforce: 60 },
];

export default function FactoryDetailsPage() {
  // --- 1. STATE MANAGEMENT ---
  const [factories, setFactories] = useState<Factory[]>(initialFactories);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modals state
  const [selectedFactory, setSelectedFactory] = useState<Factory | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // New Factory Form State
  const [newFactoryForm, setNewFactoryForm] = useState({
    name: '', location: '', capacity: '', manager: '', established: '', workforce: ''
  });

  // Sorting state
  const [sortConfig, setSortConfig] = useState<{ key: keyof Factory; direction: 'asc' | 'desc' } | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  // Reset to page 1 if the user searches, filters, or sorts
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortConfig]);


  // --- 2. HANDLERS ---
  const handleSort = (key: keyof Factory) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleApprove = (id: number) => {
    setFactories(factories.map(f => f.id === id ? { ...f, status: 'Active' } : f));
    if (selectedFactory?.id === id) setSelectedFactory({ ...selectedFactory, status: 'Active' });
  };

  const handleReject = (id: number) => {
    setFactories(factories.map(f => f.id === id ? { ...f, status: 'Inactive' } : f));
    if (selectedFactory?.id === id) setSelectedFactory({ ...selectedFactory, status: 'Inactive' });
  };

  const handleAddFactorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFactory: Factory = {
      id: factories.length + 1,
      name: newFactoryForm.name,
      location: newFactoryForm.location,
      capacity: newFactoryForm.capacity,
      manager: newFactoryForm.manager,
      established: newFactoryForm.established,
      workforce: parseInt(newFactoryForm.workforce) || 0,
      status: 'Pending', // Default status for new entries
    };

    setFactories([newFactory, ...factories]);
    setIsAddModalOpen(false);
    setNewFactoryForm({ name: '', location: '', capacity: '', manager: '', established: '', workforce: '' });
  };


  // --- 3. DATA PROCESSING ---
  // A. Filter
  const filteredFactories = factories.filter((factory) => {
    const matchesSearch = factory.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          factory.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || factory.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // B. Sort
  const sortedFactories = [...filteredFactories].sort((a, b) => {
    if (!sortConfig) return 0;
    
    // Custom sort for capacity to sort by the number, not the string
    if (sortConfig.key === 'capacity') {
      const numA = parseInt(a.capacity.replace(/\D/g, ''));
      const numB = parseInt(b.capacity.replace(/\D/g, ''));
      return sortConfig.direction === 'asc' ? numA - numB : numB - numA;
    }

    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // C. Paginate
  const totalPages = Math.ceil(sortedFactories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedFactories = sortedFactories.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  return (
    <div className="space-y-6 relative">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Factory Details</h1>
          <p className="text-gray-500 mt-2">Manage all registered processing facilities</p>
        </div>
        <Button 
          className="bg-green-700 hover:bg-green-800 w-full sm:w-auto text-white"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={18} className="mr-2" />
          Add Factory
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
              placeholder="Search by name or location..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Status:</span>
            <select
              className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-4 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th 
                  className="text-left py-3 px-6 font-semibold text-gray-700 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    Factory Name {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Location</th>
                <th 
                  className="text-left py-3 px-6 font-semibold text-gray-700 text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('capacity')}
                >
                  <div className="flex items-center gap-1">
                    Capacity {sortConfig?.key === 'capacity' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Status</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedFactories.length > 0 ? (
                paginatedFactories.map((factory) => (
                  <tr key={factory.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-md bg-green-50 flex items-center justify-center text-green-700 font-bold text-xs border border-green-100">
                          {factory.name.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{factory.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-gray-400" /> {factory.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">{factory.capacity}</td>
                    <td className="px-6 py-4">
                      <Badge variant={factory.status === 'Active' ? 'outline' : factory.status === 'Inactive' ? 'destructive' : 'secondary'} className={
                        factory.status === 'Active' ? 'bg-green-100 text-green-800 border-transparent' : 
                        factory.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-transparent' : ''
                      }>
                        {factory.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button size="sm" variant="ghost" className="text-gray-500 hover:text-green-700 hover:bg-green-50" onClick={() => setSelectedFactory(factory)} title="View Details">
                        <Eye size={16} className="mr-2" /> View Profile
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                    No factories found matching your search.
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
              Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to <span className="font-medium text-gray-900">{Math.min(startIndex + ITEMS_PER_PAGE, sortedFactories.length)}</span> of <span className="font-medium text-gray-900">{sortedFactories.length}</span> facilities
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="bg-white">
                <ChevronLeft size={16} className="mr-1"/> Prev
              </Button>
              <span className="text-sm font-medium text-gray-700 px-2">Page {currentPage} of {totalPages}</span>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="bg-white">
                Next <ChevronRight size={16} className="ml-1"/>
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* ========================================= */}
      {/* SHEET 1: View Factory Details             */}
      {/* ========================================= */}
      <Sheet open={!!selectedFactory} onOpenChange={(open) => !open && setSelectedFactory(null)}>
        <SheetContent className="overflow-y-auto w-full sm:max-w-md bg-gray-50/50 p-0">
          
          {/* FIX: Visually hidden title for accessibility to prevent the Radix UI crash! */}
          <SheetTitle className="sr-only">Factory Profile Details</SheetTitle>
          <SheetDescription className="sr-only">Detailed stats and info for the selected factory.</SheetDescription>

          {selectedFactory && (
            <div className="h-full flex flex-col">
              
              {/* Profile Header Banner */}
              <div className="bg-white p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-16 w-16 rounded-xl bg-green-100 flex items-center justify-center text-green-700 text-2xl font-bold uppercase shadow-sm border border-green-200">
                    {selectedFactory.name.charAt(0)}
                  </div>
                  <Badge variant={selectedFactory.status === 'Active' ? 'outline' : selectedFactory.status === 'Inactive' ? 'destructive' : 'secondary'} className={
                    selectedFactory.status === 'Active' ? 'bg-green-100 text-green-800 border-transparent' : 
                    selectedFactory.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-transparent' : ''
                  }>
                    {selectedFactory.status}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{selectedFactory.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={14}/> {selectedFactory.location}</p>
              </div>

              {/* Details Body */}
              <div className="p-6 space-y-6 flex-1">
                
                {/* Action Buttons for Pending Status */}
                {selectedFactory.status === 'Pending' && (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-6">
                    <p className="text-sm text-yellow-800 font-medium mb-3">This factory is awaiting admin approval.</p>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleApprove(selectedFactory.id)} className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle2 size={16} className="mr-2" /> Approve
                      </Button>
                      <Button size="sm" onClick={() => handleReject(selectedFactory.id)} variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                        <XCircle size={16} className="mr-2" /> Reject
                      </Button>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Operational Details</h4>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-4 flex items-center gap-3 border-b border-gray-50">
                      <div className="p-2 bg-gray-50 rounded-md text-gray-500"><Activity size={18} /></div>
                      <div>
                        <p className="text-xs text-gray-500">Production Capacity</p>
                        <p className="font-medium text-gray-900">{selectedFactory.capacity}</p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-md text-gray-500"><Eye size={18} /></div>
                      <div>
                        <p className="text-xs text-gray-500">Facility Manager</p>
                        <p className="font-medium text-gray-900">{selectedFactory.manager}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Facility History</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm text-center">
                      <Users size={20} className="mx-auto text-green-600 mb-2"/>
                      <p className="text-2xl font-bold text-gray-900">{selectedFactory.workforce}</p>
                      <p className="text-xs text-gray-500 mt-1">Total Workforce</p>
                    </div>
                    <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm text-center">
                      <Calendar size={20} className="mx-auto text-green-600 mb-2"/>
                      <p className="text-2xl font-bold text-gray-900">{selectedFactory.established}</p>
                      <p className="text-xs text-gray-500 mt-1">Year Established</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-6 bg-white border-t border-gray-100">
                <Button className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200" onClick={() => setSelectedFactory(null)}>
                  Close Profile
                </Button>
              </div>

            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* ========================================= */}
      {/* SHEET 2: Add New Factory Form             */}
      {/* ========================================= */}
      <Sheet open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <SheetContent className="overflow-y-auto w-full sm:max-w-md bg-white">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="text-green-700" size={24}/> Register Factory
            </SheetTitle>
            <SheetDescription>
              Add a new processing facility to the AgroTrade network.
            </SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleAddFactorySubmit} className="space-y-6">
            
            {/* Section 1 */}
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Basic Information</h4>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">Factory Name</label>
                <input required type="text" placeholder="e.g. AgriPlus Ltd" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white" value={newFactoryForm.name} onChange={(e) => setNewFactoryForm({...newFactoryForm, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">Location</label>
                <input required type="text" placeholder="e.g. Rouiba Industrial Zone" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white" value={newFactoryForm.location} onChange={(e) => setNewFactoryForm({...newFactoryForm, location: e.target.value})} />
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Operational Details</h4>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">Production Capacity</label>
                <input required type="text" placeholder="e.g. 5000 tons/month" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white" value={newFactoryForm.capacity} onChange={(e) => setNewFactoryForm({...newFactoryForm, capacity: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">Manager Name</label>
                <input required type="text" placeholder="e.g. Karim M." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white" value={newFactoryForm.manager} onChange={(e) => setNewFactoryForm({...newFactoryForm, manager: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">Est. Year</label>
                  <input required type="text" placeholder="2018" maxLength={4} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white" value={newFactoryForm.established} onChange={(e) => setNewFactoryForm({...newFactoryForm, established: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">Workforce</label>
                  <input required type="number" placeholder="150" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white" value={newFactoryForm.workforce} onChange={(e) => setNewFactoryForm({...newFactoryForm, workforce: e.target.value})} />
                </div>
              </div>
            </div>
            
            <div className="pt-6 flex gap-3">
              <Button type="button" variant="outline" className="w-full" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white">Save Factory</Button>
            </div>

          </form>
        </SheetContent>
      </Sheet>

    </div>
  );
}