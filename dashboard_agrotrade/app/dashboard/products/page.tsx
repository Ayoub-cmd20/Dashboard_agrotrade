'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ProductsPage() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Corn Seeds', category: 'Seeds', price: '$45', stock: 1200, status: 'Active', seller: 'Farm Products Inc.', description: 'High quality corn seeds for summer planting.' },
    { id: 2, name: 'Wheat Grains', category: 'Grains', price: '$35', stock: 850, status: 'Pending', seller: 'Ahmed Trading Co.', description: 'Premium wheat grains imported from Ukraine.' },
    { id: 3, name: 'Rice', category: 'Grains', price: '$40', stock: 2100, status: 'Active', seller: 'Agri Solutions', description: 'Long grain rice, organic.' },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleApprove = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, status: 'Active' } : p));
    if (selectedProduct?.id === id) {
      setSelectedProduct((prev: any) => ({ ...prev, status: 'Active' }));
    }
  };

  const handleReject = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, status: 'Rejected' } : p));
    if (selectedProduct?.id === id) {
      setSelectedProduct((prev: any) => ({ ...prev, status: 'Rejected' }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-2">Manage all products</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus size={18} className="mr-2" />
          Add Product
        </Button>
      </div>

      <Card className="p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Price</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Stock</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900">{product.name}</td>
                <td className="py-3 px-4 text-gray-600">{product.category}</td>
                <td className="py-3 px-4 text-gray-900 font-semibold">{product.price}</td>
                <td className="py-3 px-4 text-gray-600">{product.stock} units</td>
                <td className="py-3 px-4">
                  <Badge variant={
                    product.status === 'Active' ? 'outline' :
                      product.status === 'Rejected' ? 'destructive' : 'secondary'
                  } className={
                    product.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100 border-transparent' :
                      product.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-transparent' : ''
                  }>
                    {product.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedProduct(product)}
                      title="View Details"
                    >
                      <Eye size={16} className="mr-1" /> View
                    </Button>
                    {product.status === 'Pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 h-8 w-8 p-0"
                          onClick={() => handleApprove(product.id)}
                          title="Approve"
                        >
                          <Check size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 h-8 w-8 p-0"
                          onClick={() => handleReject(product.id)}
                          title="Reject"
                        >
                          <X size={16} />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              Review product information and status.
            </DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right pt-1">Product:</span>
                <span className="col-span-3">{selectedProduct.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right pt-1">Category:</span>
                <span className="col-span-3">{selectedProduct.category}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right pt-1">Price:</span>
                <span className="col-span-3">{selectedProduct.price}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right pt-1">Stock:</span>
                <span className="col-span-3">{selectedProduct.stock}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right pt-1">Seller:</span>
                <span className="col-span-3">{selectedProduct.seller}</span>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <span className="font-bold text-right pt-1">Desc:</span>
                <span className="col-span-3">{selectedProduct.description}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold text-right pt-1">Status:</span>
                <span className="col-span-3">
                  <Badge variant={
                    selectedProduct.status === 'Active' ? 'outline' :
                      selectedProduct.status === 'Rejected' ? 'destructive' : 'secondary'
                  } className={
                    selectedProduct.status === 'Active' ? 'bg-green-100 text-green-800 border-transparent' :
                      selectedProduct.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-transparent' : ''
                  }>
                    {selectedProduct.status}
                  </Badge>
                </span>
              </div>
            </div>
          )}

          <DialogFooter>
            {selectedProduct?.status === 'Pending' && (
              <div className="flex gap-2 w-full justify-end">
                <Button
                  variant="destructive"
                  onClick={() => { handleReject(selectedProduct.id); setSelectedProduct(null); }}
                >
                  Reject
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => { handleApprove(selectedProduct.id); setSelectedProduct(null); }}
                >
                  Approve
                </Button>
              </div>
            )}
            <Button variant="secondary" onClick={() => setSelectedProduct(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
