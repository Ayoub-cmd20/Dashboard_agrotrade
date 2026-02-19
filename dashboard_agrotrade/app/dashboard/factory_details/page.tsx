'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, MapPin, Activity, Calendar } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function FactoryDetailsPage() {
  const [factories, setFactories] = useState([
    {
      id: 1,
      name: 'Factory A',
      location: 'Cairo, Industrial Zone',
      capacity: '5000 tons/month',
      status: 'Active',
      manager: 'Osama El-Sayed',
      established: '2015',
      workforce: 120
    },
    {
      id: 2,
      name: 'Factory B',
      location: 'Alexandria, Port Area',
      capacity: '3500 tons/month',
      status: 'Active',
      manager: 'Khaled Youssef',
      established: '2018',
      workforce: 85
    },
    {
      id: 3,
      name: 'Factory C',
      location: 'Giza, South District',
      capacity: '2000 tons/month',
      status: 'Inactive',
      manager: 'Mahmoud Ali',
      established: '2020',
      workforce: 45
    },
  ]);

  const [selectedFactory, setSelectedFactory] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Factory Details</h1>
          <p className="text-gray-500 mt-2">Manage all factories</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus size={18} className="mr-2" />
          Add Factory
        </Button>
      </div>

      <Card className="p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Capacity</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {factories.map((factory) => (
              <tr key={factory.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900 font-medium">{factory.name}</td>
                <td className="py-3 px-4 text-gray-600">{factory.location}</td>
                <td className="py-3 px-4 text-gray-600">{factory.capacity}</td>
                <td className="py-3 px-4">
                  <Badge variant={factory.status === 'Active' ? 'outline' : 'secondary'} className={
                    factory.status === 'Active' ? 'bg-green-100 text-green-800 border-transparent' : ''
                  }>
                    {factory.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedFactory(factory)}
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

      <Sheet open={!!selectedFactory} onOpenChange={(open) => !open && setSelectedFactory(null)}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Factory Profile</SheetTitle>
            <SheetDescription>
              Detailed information about the factory facility.
            </SheetDescription>
          </SheetHeader>

          {selectedFactory && (
            <div className="mt-6 space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                <div className="h-16 w-16 rounded-lg bg-orange-100 flex items-center justify-center text-orange-700 text-2xl font-bold">
                  {selectedFactory.name.charAt(7)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedFactory.name}</h3>
                  <Badge variant={selectedFactory.status === 'Active' ? 'outline' : 'secondary'} className={
                    selectedFactory.status === 'Active' ? 'bg-green-100 text-green-800 border-transparent' : ''
                  }>
                    {selectedFactory.status}
                  </Badge>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Facility Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin size={18} className="text-gray-400" />
                    <span className="font-medium">Location:</span>
                    <span>{selectedFactory.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Activity size={18} className="text-gray-400" />
                    <span className="font-medium">Capacity:</span>
                    <span>{selectedFactory.capacity}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Activity size={18} className="text-gray-400" />
                    <span className="font-medium">Manager:</span>
                    <span>{selectedFactory.manager}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Operational Stats</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Workforce</p>
                    <p className="text-lg font-bold text-gray-900">{selectedFactory.workforce}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Established</p>
                    <p className="text-lg font-bold text-gray-900">{selectedFactory.established}</p>
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
