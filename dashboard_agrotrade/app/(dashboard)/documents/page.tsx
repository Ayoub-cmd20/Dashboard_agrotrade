import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function DocumentsPage() {
  const documents = [
    { id: 1, name: 'Invoice #2024-001', date: '2024-02-10', status: 'Approved' },
    { id: 2, name: 'Certificate #2024-002', date: '2024-02-09', status: 'Pending' },
    { id: 3, name: 'License #2024-003', date: '2024-02-08', status: 'Approved' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-500 mt-2">Manage all documents</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus size={18} className="mr-2" />
          Add Document
        </Button>
      </div>

      <Card className="p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900">{doc.name}</td>
                <td className="py-3 px-4 text-gray-600">{doc.date}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    doc.status === 'Approved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doc.status}
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

