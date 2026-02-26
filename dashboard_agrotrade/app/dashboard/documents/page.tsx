'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Check, X, FileText, Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Define the Document type
type DocumentItem = {
  id: number;
  name: string;
  date: string;
  status: string;
  type: string;
  size: string;
};

// Initial mock data
const initialDocs: DocumentItem[] = [
  { id: 1, name: 'Invoice #2024-001', date: '2024-02-10', status: 'Approved', type: 'Invoice', size: '1.2 MB' },
  { id: 2, name: 'Certificate #2024-002', date: '2024-02-09', status: 'Pending', type: 'Certificate', size: '850 KB' },
  { id: 3, name: 'License #2024-003', date: '2024-02-08', status: 'Approved', type: 'License', size: '2.4 MB' },
  { id: 4, name: 'Tax Document #2023', date: '2024-02-05', status: 'Pending', type: 'Tax', size: '3.1 MB' },
  { id: 5, name: 'Factory Safety Clearance', date: '2024-02-01', status: 'Pending', type: 'Certificate', size: '4.5 MB' },
];

export default function DocumentsPage() {
  // --- 1. STATE MANAGEMENT ---
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocs);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  
  // Modal states
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDocForm, setNewDocForm] = useState({ name: '', type: 'Invoice', file: '' });

  // Sorting state
  const [sortConfig, setSortConfig] = useState<{ key: keyof DocumentItem; direction: 'asc' | 'desc' } | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  // Reset pagination when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter, sortConfig]);

  // --- 2. HANDLERS ---
  const handleApprove = (id: number) => {
    setDocuments(documents.map(d => d.id === id ? { ...d, status: 'Approved' } : d));
    if (selectedDoc?.id === id) setSelectedDoc((prev: any) => ({ ...prev, status: 'Approved' }));
  };

  const handleReject = (id: number) => {
    setDocuments(documents.map(d => d.id === id ? { ...d, status: 'Rejected' } : d));
    if (selectedDoc?.id === id) setSelectedDoc((prev: any) => ({ ...prev, status: 'Rejected' }));
  };

  const handleSort = (key: keyof DocumentItem) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleAddDocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const newDoc: DocumentItem = {
      id: documents.length + 1,
      name: newDocForm.name,
      type: newDocForm.type,
      date: today,
      size: '2.1 MB', // Mock file size
      status: 'Pending',
    };
    setDocuments([newDoc, ...documents]);
    setIsAddModalOpen(false);
    setNewDocForm({ name: '', type: 'Invoice', file: '' });
  };

  // --- 3. DATA PROCESSING ---
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const sortedDocs = [...filteredDocs].sort((a, b) => {
    if (!sortConfig) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedDocs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDocs = sortedDocs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-500 mt-2">Review KYC and Business documents for account approvals</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="bg-green-700 hover:bg-green-800 text-white w-full sm:w-auto">
          <Upload size={18} className="mr-2" />
          Upload Document
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
              placeholder="Search documents..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Document Type:</span>
            <select
              className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-4 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Invoice">Invoice</option>
              <option value="Certificate">Certificate</option>
              <option value="License">License</option>
              <option value="Tax">Tax</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1">Document Name {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</div>
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Type</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('date')}>
                  <div className="flex items-center gap-1">Upload Date {sortConfig?.key === 'date' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</div>
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Size</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Status</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedDocs.length > 0 ? (
                paginatedDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <FileText size={16} className="text-gray-400" />
                      {doc.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-0">{doc.type}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doc.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{doc.size}</td>
                    <td className="px-6 py-4">
                      <Badge variant={doc.status === 'Approved' ? 'outline' : doc.status === 'Rejected' ? 'destructive' : 'secondary'} 
                             className={doc.status === 'Approved' ? 'bg-green-100 text-green-800 hover:bg-green-100 border-transparent' : doc.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-transparent' : ''}>
                        {doc.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost" className="text-gray-500 hover:text-green-700 hover:bg-green-50 h-8 px-2" onClick={() => setSelectedDoc(doc)}>
                          <Eye size={16} className="mr-1" /> Preview
                        </Button>
                        {doc.status === 'Pending' && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50 h-8 w-8 p-0" onClick={() => handleApprove(doc.id)} title="Approve">
                              <Check size={16} />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 h-8 w-8 p-0" onClick={() => handleReject(doc.id)} title="Reject">
                              <X size={16} />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">No documents found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
            <span className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to <span className="font-medium text-gray-900">{Math.min(startIndex + ITEMS_PER_PAGE, sortedDocs.length)}</span> of <span className="font-medium text-gray-900">{sortedDocs.length}</span> documents
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
      {/* DIALOG 1: Preview Document                */}
      {/* ========================================= */}
      <Dialog open={!!selectedDoc} onOpenChange={(open) => !open && setSelectedDoc(null)}>
        <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><FileText className="text-green-700"/> {selectedDoc?.name}</DialogTitle>
            <DialogDescription>
              Previewing document. {selectedDoc?.type} - {selectedDoc?.size}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 bg-gray-50 rounded-lg flex items-center justify-center p-8 border-2 border-dashed border-gray-300 my-4 shadow-inner">
            <div className="text-center">
              <FileText size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-700 font-medium">Document Preview Area</p>
              <p className="text-gray-500 text-sm mt-2">
                This is a secure mock preview for <strong>{selectedDoc?.name}</strong>.
                <br />
                Once the backend is connected, the PDF renderer will display here.
              </p>
            </div>
          </div>

          <DialogFooter className="bg-gray-50 -mx-6 -mb-6 p-4 sm:justify-between border-t border-gray-100">
            {selectedDoc?.status === 'Pending' ? (
              <div className="flex gap-2 w-full justify-end">
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => { handleReject(selectedDoc.id); setSelectedDoc(null); }}>Reject</Button>
                <Button className="bg-green-700 hover:bg-green-800 text-white" onClick={() => { handleApprove(selectedDoc.id); setSelectedDoc(null); }}>Approve Document</Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setSelectedDoc(null)} className="ml-auto bg-white">Close Preview</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ========================================= */}
      {/* DIALOG 2: Add New Document Form           */}
      {/* ========================================= */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>Manually upload a document to the verification queue.</DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddDocSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Document Title</label>
                <input required type="text" placeholder="e.g. Tax ID 2026" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" value={newDocForm.name} onChange={(e) => setNewDocForm({...newDocForm, name: e.target.value})} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Document Type</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white" value={newDocForm.type} onChange={(e) => setNewDocForm({...newDocForm, type: e.target.value})}>
                  <option value="Invoice">Invoice</option>
                  <option value="Certificate">Certificate</option>
                  <option value="License">License</option>
                  <option value="Tax">Tax</option>
                </select>
              </div>

              <div className="space-y-2 mt-2">
                <label className="text-sm font-medium text-gray-700">Select File</label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                   <Upload className="text-gray-400 mb-2" size={24} />
                   <span className="text-sm text-gray-600">Click to browse or drag PDF here</span>
                </div>
                {/* Hidden file input would go here in production */}
              </div>
            </div>
            
            <DialogFooter className="bg-gray-50 -mx-6 -mb-6 p-4">
              <Button type="button" variant="outline" className="bg-white" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-green-700 hover:bg-green-800 text-white">Upload File</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}