import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function SellerDetailsPage() {
  const sellers = [
    { id: 1, name: 'Ahmed Trading Co.', email: 'ahmed@example.com', sales: '$45,000', status: 'Active' },
    { id: 2, name: 'Farm Products Inc.', email: 'farm@example.com', sales: '$32,000', status: 'Active' },
    { id: 3, name: 'Agri Solutions', email: 'agri@example.com', sales: '$28,000', status: 'Inactive' },
  ];

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
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900">{seller.name}</td>
                <td className="py-3 px-4 text-gray-600">{seller.email}</td>
                <td className="py-3 px-4 text-gray-900 font-semibold">{seller.sales}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    seller.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {seller.status}
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
