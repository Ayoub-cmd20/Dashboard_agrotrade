'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function SellerDetailsPage() {
  const [sellers, setSellers] = useState([
    {
      id: 1,
      name: 'Ahmed Trading Co.',
      email: 'ahmed@example.com',
      phone: '+20 123 456 7890',
      address: '123 Market St, Cairo, Egypt',
      sales: '$45,000',
      status: 'Active',
      joinedDate: '2023-01-15',
      productsCount: 15,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Farm Products Inc.',
      email: 'farm@example.com',
      phone: '+20 100 111 2222',
      address: '45 Agriculture Rd, Alexandria, Egypt',
      sales: '$32,000',
      status: 'Active',
      joinedDate: '2023-03-20',
      productsCount: 8,
      rating: 4.5
    },
    {
      id: 3,
      name: 'Agri Solutions',
      email: 'agri@example.com',
      phone: '+20 111 333 4444',
      address: '78 Nile View, Giza, Egypt',
      sales: '$28,000',
      status: 'Inactive',
      joinedDate: '2023-06-10',
      productsCount: 12,
      rating: 4.2
    },
  ]);

  const [selectedSeller, setSelectedSeller] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Seller Details</h1>
          <p className="text-gray-500 mt-2">Manage all sellers</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus size={18} className="mr-2" />
          Add Seller
        </Button>
      </div>

      <Card className="p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Sales</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900 font-medium">{seller.name}</td>
                <td className="py-3 px-4 text-gray-600">{seller.email}</td>
                <td className="py-3 px-4 text-gray-900 font-semibold">{seller.sales}</td>
                <td className="py-3 px-4">
                  <Badge variant={seller.status === 'Active' ? 'outline' : 'secondary'} className={
                    seller.status === 'Active' ? 'bg-green-100 text-green-800 border-transparent' : ''
                  }>
                    {seller.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedSeller(seller)}
                    title="View Details"
                  >
                    <Eye size={16} className="mr-1" /> View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Sheet open={!!selectedSeller} onOpenChange={(open) => !open && setSelectedSeller(null)}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Seller Profile</SheetTitle>
            <SheetDescription>
              Detailed information about the seller.
            </SheetDescription>
          </SheetHeader>

          {selectedSeller && (
            <div className="mt-6 space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-2xl font-bold">
                  {selectedSeller.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedSeller.name}</h3>
                  <Badge variant={selectedSeller.status === 'Active' ? 'outline' : 'secondary'} className={
                    selectedSeller.status === 'Active' ? 'bg-green-100 text-green-800 border-transparent' : ''
                  }>
                    {selectedSeller.status}
                  </Badge>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail size={18} className="text-gray-400" />
                    <span>{selectedSeller.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone size={18} className="text-gray-400" />
                    <span>{selectedSeller.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin size={18} className="text-gray-400" />
                    <span>{selectedSeller.address}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Performance Stats</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Total Sales</p>
                    <p className="text-lg font-bold text-gray-900">{selectedSeller.sales}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Products</p>
                    <p className="text-lg font-bold text-gray-900">{selectedSeller.productsCount}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Rating</p>
                    <p className="text-lg font-bold text-gray-900">{selectedSeller.rating} / 5.0</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Joined</p>
                    <p className="text-lg font-bold text-gray-900">{selectedSeller.joinedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
