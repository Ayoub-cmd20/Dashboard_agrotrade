'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Check, X, Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Define the Product type
type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  seller: string;
  description: string;
};

// Your initial mock data
const initialProducts: Product[] = [
  { id: 1, name: 'Corn Seeds', category: 'Seeds', price: 'DZD 45', stock: 1200, status: 'Active', seller: 'Farm Products Inc.', description: 'High quality corn seeds for summer planting.' },
  { id: 2, name: 'Wheat Grains', category: 'Grains', price: 'DZD 35', stock: 850, status: 'Pending', seller: 'Ahmed Trading Co.', description: 'Premium wheat grains imported from Ukraine.' },
  { id: 3, name: 'Rice', category: 'Grains', price: 'DZD 40', stock: 2100, status: 'Active', seller: 'Agri Solutions', description: 'Long grain rice, organic.' },
  { id: 4, name: 'Tomato Seeds', category: 'Seeds', price: 'DZD 15', stock: 400, status: 'Rejected', seller: 'Green Valley', description: 'Organic cherry tomato seeds.' },
  { id: 5, name: 'Barley', category: 'Grains', price: 'DZD 28', stock: 3000, status: 'Pending', seller: 'Farm Products Inc.', description: 'Animal feed grade barley.' },
];

export default function ProductsPage() {
  // --- 1. STATE MANAGEMENT ---
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductForm, setNewProductForm] = useState({ name: '', category: 'Seeds', price: '', stock: '', seller: '', description: '' });

  // Sorting state
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: 'asc' | 'desc' } | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  // Reset to page 1 if search, filter, or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, sortConfig]);

  // --- 2. HANDLERS ---
  const handleApprove = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, status: 'Active' } : p));
    if (selectedProduct?.id === id) setSelectedProduct((prev: any) => ({ ...prev, status: 'Active' }));
  };

  const handleReject = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, status: 'Rejected' } : p));
    if (selectedProduct?.id === id) setSelectedProduct((prev: any) => ({ ...prev, status: 'Rejected' }));
  };

  const handleSort = (key: keyof Product) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: products.length + 1,
      name: newProductForm.name,
      category: newProductForm.category,
      price: newProductForm.price,
      stock: parseInt(newProductForm.stock) || 0,
      seller: newProductForm.seller,
      description: newProductForm.description,
      status: 'Pending',
    };
    setProducts([newProduct, ...products]);
    setIsAddModalOpen(false);
    setNewProductForm({ name: '', category: 'Seeds', price: '', stock: '', seller: '', description: '' });
  };

  // --- 3. DATA PROCESSING ---
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortConfig) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-2">Manage all inventory and seller products</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="bg-green-700 hover:bg-green-800 text-white w-full sm:w-auto">
          <Plus size={18} className="mr-2" />
          Add Product
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
              placeholder="Search by name or seller..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Category:</span>
            <select
              className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-4 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Seeds">Seeds</option>
              <option value="Grains">Grains</option>
              <option value="Fertilizer">Fertilizer</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1">Name {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</div>
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Category</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('price')}>
                  <div className="flex items-center gap-1">Price {sortConfig?.key === 'price' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</div>
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('stock')}>
                  <div className="flex items-center gap-1">Stock {sortConfig?.key === 'stock' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</div>
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700 text-sm">Status</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{product.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.stock} units</td>
                    <td className="px-6 py-4">
                      <Badge variant={product.status === 'Active' ? 'outline' : product.status === 'Rejected' ? 'destructive' : 'secondary'} 
                             className={product.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100 border-transparent' : product.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-transparent' : ''}>
                        {product.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {product.status === 'Pending' && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50 h-8 w-8 p-0" onClick={() => handleApprove(product.id)}>
                              <Check size={16} />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 h-8 w-8 p-0" onClick={() => handleReject(product.id)}>
                              <X size={16} />
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-green-700 hover:bg-green-50 h-8 w-8 p-0" onClick={() => setSelectedProduct(product)}>
                          <Eye size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
            <span className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to <span className="font-medium text-gray-900">{Math.min(startIndex + ITEMS_PER_PAGE, sortedProducts.length)}</span> of <span className="font-medium text-gray-900">{sortedProducts.length}</span> products
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
      {/* DIALOG 1: View Product Details            */}
      {/* ========================================= */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl text-green-800"><Package size={20}/> Product Details</DialogTitle>
            <DialogDescription>Review product information and current moderation status.</DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="grid gap-4 py-4 border-t border-gray-100 mt-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right text-gray-600 text-sm">Product:</span>
                <span className="col-span-3 font-semibold text-gray-900">{selectedProduct.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right text-gray-600 text-sm">Category:</span>
                <span className="col-span-3"><Badge variant="secondary">{selectedProduct.category}</Badge></span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right text-gray-600 text-sm">Price:</span>
                <span className="col-span-3 font-bold text-green-700">{selectedProduct.price}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right text-gray-600 text-sm">Stock:</span>
                <span className="col-span-3">{selectedProduct.stock} Units</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right text-gray-600 text-sm">Seller:</span>
                <span className="col-span-3">{selectedProduct.seller}</span>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <span className="font-bold text-right text-gray-600 text-sm">Desc:</span>
                <span className="col-span-3 text-sm text-gray-700">{selectedProduct.description}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right text-gray-600 text-sm">Status:</span>
                <span className="col-span-3">
                  <Badge variant={selectedProduct.status === 'Active' ? 'outline' : selectedProduct.status === 'Rejected' ? 'destructive' : 'secondary'} 
                         className={selectedProduct.status === 'Active' ? 'bg-green-100 text-green-800 border-transparent' : selectedProduct.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-transparent' : ''}>
                    {selectedProduct.status}
                  </Badge>
                </span>
              </div>
            </div>
          )}

          <DialogFooter className="bg-gray-50 -mx-6 -mb-6 p-4 sm:justify-between">
            {selectedProduct?.status === 'Pending' ? (
              <div className="flex gap-2 w-full justify-end">
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => { handleReject(selectedProduct.id); setSelectedProduct(null); }}>Reject</Button>
                <Button className="bg-green-700 hover:bg-green-800 text-white" onClick={() => { handleApprove(selectedProduct.id); setSelectedProduct(null); }}>Approve</Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setSelectedProduct(null)} className="ml-auto bg-white">Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ========================================= */}
      {/* DIALOG 2: Add New Product Form            */}
      {/* ========================================= */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Manually register a new product to the platform inventory.</DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddProductSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Product Name</label>
                <input required type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" value={newProductForm.name} onChange={(e) => setNewProductForm({...newProductForm, name: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Price (e.g. DZD 45)</label>
                  <input required type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" value={newProductForm.price} onChange={(e) => setNewProductForm({...newProductForm, price: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Stock Units</label>
                  <input required type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" value={newProductForm.stock} onChange={(e) => setNewProductForm({...newProductForm, stock: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white" value={newProductForm.category} onChange={(e) => setNewProductForm({...newProductForm, category: e.target.value})}>
                    <option value="Seeds">Seeds</option>
                    <option value="Grains">Grains</option>
                    <option value="Fertilizer">Fertilizer</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Seller Name</label>
                  <input required type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" value={newProductForm.seller} onChange={(e) => setNewProductForm({...newProductForm, seller: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none" value={newProductForm.description} onChange={(e) => setNewProductForm({...newProductForm, description: e.target.value})} />
              </div>
            </div>
            
            <DialogFooter className="bg-gray-50 -mx-6 -mb-6 p-4">
              <Button type="button" variant="outline" className="bg-white" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-green-700 hover:bg-green-800 text-white">Save Product</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}