import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function ProductsPage() {
  const products = [
    { id: 1, name: 'Corn Seeds', category: 'Seeds', price: '$45', stock: 1200 },
    { id: 2, name: 'Wheat Grains', category: 'Grains', price: '$35', stock: 850 },
    { id: 3, name: 'Rice', category: 'Grains', price: '$40', stock: 2100 },
  ];

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
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900">{product.name}</td>
                <td className="py-3 px-4 text-gray-600">{product.category}</td>
                <td className="py-3 px-4 text-gray-900 font-semibold">{product.price}</td>
                <td className="py-3 px-4 text-gray-600">{product.stock} units</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
