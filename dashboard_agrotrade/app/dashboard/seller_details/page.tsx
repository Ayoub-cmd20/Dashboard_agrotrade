'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, MapPin, Mail, Phone, Calendar, Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Store, DollarSign, Star, Package } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// Define the Seller type for TypeScript
type Seller = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  sales: string;
  status: string;
  joinedDate: string;
  productsCount: number;
  rating: number;
};

// Initial mock data
const initialSellers: Seller[] = [
  { id: 1, name: 'Ahmed Trading Co.', email: 'ahmed@example.com', phone: '+20 123 456 7890', address: '123 Market St, Cairo', sales: 'DZD 45,000', status: 'Active', joinedDate: '2023-01-15', productsCount: 15, rating: 4.8 },
  { id: 2, name: 'Farm Products Inc.', email: 'farm@example.com', phone: '+20 100 111 2222', address: '45 Agriculture Rd, Alexandria', sales: 'DZD 32,000', status: 'Active', joinedDate: '2023-03-20', productsCount: 8, rating: 4.5 },
  { id: 3, name: 'Agri Solutions', email: 'agri@example.com', phone: '+20 111 333 4444', address: '78 Nile View, Giza', sales: 'DZD 28,000', status: 'Inactive', joinedDate: '2023-06-10', productsCount: 12, rating: 4.2 },
  { id: 4, name: 'Green Valley Store', email: 'hello@greenvalley.com', phone: '+20 122 444 5555', address: '90 Delta Rd, Luxor', sales: 'DZD 0', status: 'Pending', joinedDate: '2024-02-15', productsCount: 0, rating: 0.0 },
  { id: 5, name: 'Nile Organics', email: 'contact@nileorg.com', phone: '+20 155 666 7777', address: '12 Oasis St, Aswan', sales: 'DZD 12,500', status: 'Active', joinedDate: '2023-11-05', productsCount: 24, rating: 4.9 },
];

export default function SellerDetailsPage() {
  // --- STATE MANAGEMENT ---
  const [sellers, setSellers] = useState<Seller[]>(initialSellers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modals state
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // New Seller Form State
  const [newSellerForm, setNewSellerForm] = useState({
    name: '', email: '', phone: '', address: ''
  });

  // Sorting state
  const [sortConfig, setSortConfig] = useState<{ key: keyof Seller; direction: 'asc' | 'desc' } | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortConfig]);


  // --- HANDLERS ---
  const handleSort = (key: keyof Seller) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleAddSellerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const newSeller: Seller = {
      id: sellers.length + 1,
      name: newSellerForm.name,
      email: newSellerForm.email,
      phone: newSellerForm.phone,
      address: newSellerForm.address,
      sales: 'DZD 0',
      productsCount: 0,
      rating: 0.0,
      joinedDate: today,
      status: 'Pending',
    };

    setSellers([newSeller, ...sellers]);
    setIsAddModalOpen(false);
    setNewSellerForm({ name: '', email: '', phone: '', address: '' });
  };


  // --- DATA PROCESSING ---
  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          seller.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || seller.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedSellers = [...filteredSellers].sort((a, b) => {
    if (!sortConfig) return 0;
    
    // Custom sort for sales to sort by number, ignoring 'DZD ' and ','
    if (sortConfig.key === 'sales') {
      const numA = parseInt(a.sales.replace(/[^0-9.-]+/g,""));
      const numB = parseInt(b.sales.replace(/[^0-9.-]+/g,""));
      return sortConfig.direction === 'asc' ? numA - numB : numB - numA;
    }

    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedSellers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSellers = sortedSellers.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  return (
    <div className="space-y-6 relative">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Seller Details</h1>
          <p className="text-gray-500 mt-2">Manage store owners, farmers, and distributors</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="bg-green-700 hover:bg-green-800 w-full sm:w-auto text-white">
          <Plus size={18} className="mr-2" />
          Add Seller
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
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1">Seller Name {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</div>
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Contact Email</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('sales')}>
                  <div className="flex items-center gap-1">Total Sales {sortConfig?.key === 'sales' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</div>
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Status</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedSellers.length > 0 ? (
                paginatedSellers.map((seller) => (
                  <tr key={seller.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-md bg-green-50 flex items-center justify-center text-green-700 font-bold text-xs border border-green-100">
                          {seller.name.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{seller.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{seller.email}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{seller.sales}</td>
                    <td className="px-6 py-4">
                      <Badge variant={seller.status === 'Active' ? 'outline' : seller.status === 'Inactive' ? 'destructive' : 'secondary'} className={
                        seller.status === 'Active' ? 'bg-green-100 text-green-800 border-transparent' : 
                        seller.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-transparent' : ''
                      }>
                        {seller.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button size="sm" variant="ghost" className="text-gray-500 hover:text-green-700 hover:bg-green-50" onClick={() => setSelectedSeller(seller)} title="View Details">
                        <Eye size={16} className="mr-2" /> View Profile
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">No sellers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
            <span className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to <span className="font-medium text-gray-900">{Math.min(startIndex + ITEMS_PER_PAGE, sortedSellers.length)}</span> of <span className="font-medium text-gray-900">{sortedSellers.length}</span> sellers
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
      {/* SHEET 1: View Seller Details              */}
      {/* ========================================= */}
      <Sheet open={!!selectedSeller} onOpenChange={(open) => !open && setSelectedSeller(null)}>
        <SheetContent className="overflow-y-auto w-full sm:max-w-md bg-gray-50/50 p-0">
          
          {/* FIX: Visually hidden title for accessibility to prevent the Radix UI crash! */}
          <SheetTitle className="sr-only">Seller Profile Details</SheetTitle>
          <SheetDescription className="sr-only">Detailed contact and performance stats for the selected seller.</SheetDescription>

          {selectedSeller && (
            <div className="h-full flex flex-col">
              
              {/* Profile Header Banner */}
              <div className="bg-white p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-16 w-16 rounded-xl bg-green-100 flex items-center justify-center text-green-700 text-2xl font-bold uppercase shadow-sm border border-green-200">
                    {selectedSeller.name.charAt(0)}
                  </div>
                  <Badge variant={selectedSeller.status === 'Active' ? 'outline' : selectedSeller.status === 'Inactive' ? 'destructive' : 'secondary'} className={
                    selectedSeller.status === 'Active' ? 'bg-green-100 text-green-800 border-transparent' : 
                    selectedSeller.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-transparent' : ''
                  }>
                    {selectedSeller.status}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{selectedSeller.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={14}/> {selectedSeller.address}</p>
              </div>

              {/* Details Body */}
              <div className="p-6 space-y-6 flex-1">

                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Contact Information</h4>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-4 flex items-center gap-3 border-b border-gray-50">
                      <div className="p-2 bg-gray-50 rounded-md text-gray-500"><Mail size={18} /></div>
                      <div>
                        <p className="text-xs text-gray-500">Email Address</p>
                        <p className="font-medium text-gray-900">{selectedSeller.email}</p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-md text-gray-500"><Phone size={18} /></div>
                      <div>
                        <p className="text-xs text-gray-500">Phone Number</p>
                        <p className="font-medium text-gray-900">{selectedSeller.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Performance Stats</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                      <DollarSign size={20} className="text-green-600 mb-2"/>
                      <p className="text-xl font-bold text-gray-900">{selectedSeller.sales}</p>
                      <p className="text-xs text-gray-500 mt-1">Total Sales</p>
                    </div>
                    <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                      <Package size={20} className="text-green-600 mb-2"/>
                      <p className="text-xl font-bold text-gray-900">{selectedSeller.productsCount}</p>
                      <p className="text-xs text-gray-500 mt-1">Active Products</p>
                    </div>
                    <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                      <Star size={20} className="text-yellow-500 mb-2"/>
                      <p className="text-xl font-bold text-gray-900">{selectedSeller.rating} / 5.0</p>
                      <p className="text-xs text-gray-500 mt-1">Average Rating</p>
                    </div>
                    <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                      <Calendar size={20} className="text-green-600 mb-2"/>
                      <p className="text-xl font-bold text-gray-900">{selectedSeller.joinedDate.split('-')[0]}</p>
                      <p className="text-xs text-gray-500 mt-1">Year Joined</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-6 bg-white border-t border-gray-100 mt-auto">
                <Button className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200" onClick={() => setSelectedSeller(null)}>
                  Close Profile
                </Button>
              </div>

            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* ========================================= */}
      {/* SHEET 2: Add New Seller Form              */}
      {/* ========================================= */}
      <Sheet open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <SheetContent className="overflow-y-auto w-full sm:max-w-md bg-white">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Store className="text-green-700" size={24}/> Register Seller
            </SheetTitle>
            <SheetDescription>
              Create a new seller account manually for farmers or store owners.
            </SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleAddSellerSubmit} className="space-y-6">
            
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Business Information</h4>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">Business Name</label>
                <input required type="text" placeholder="e.g. Nile Organics" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white" value={newSellerForm.name} onChange={(e) => setNewSellerForm({...newSellerForm, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">Physical Address</label>
                <input required type="text" placeholder="e.g. 12 Oasis St, Aswan" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white" value={newSellerForm.address} onChange={(e) => setNewSellerForm({...newSellerForm, address: e.target.value})} />
              </div>
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Contact Details</h4>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">Email Address</label>
                <input required type="email" placeholder="contact@business.com" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white" value={newSellerForm.email} onChange={(e) => setNewSellerForm({...newSellerForm, email: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">Phone Number</label>
                <input required type="text" placeholder="+20 123 456 7890" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white" value={newSellerForm.phone} onChange={(e) => setNewSellerForm({...newSellerForm, phone: e.target.value})} />
              </div>
            </div>
            
            <div className="pt-6 flex gap-3">
              <Button type="button" variant="outline" className="w-full" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white">Create Account</Button>
            </div>

          </form>
        </SheetContent>
      </Sheet>

    </div>
  );
}