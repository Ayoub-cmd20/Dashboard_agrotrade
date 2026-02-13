import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function FactoryDetailsPage() {
  const factories = [
    { id: 1, name: 'Factory A', location: 'Cairo', capacity: '5000 tons', status: 'Active' },
    { id: 2, name: 'Factory B', location: 'Alexandria', capacity: '3500 tons', status: 'Active' },
    { id: 3, name: 'Factory C', location: 'Giza', capacity: '2000 tons', status: 'Inactive' },
  ];

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
            </tr>
          </thead>
          <tbody>
            {factories.map((factory) => (
              <tr key={factory.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900">{factory.name}</td>
                <td className="py-3 px-4 text-gray-600">{factory.location}</td>
                <td className="py-3 px-4 text-gray-600">{factory.capacity}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    factory.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {factory.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
