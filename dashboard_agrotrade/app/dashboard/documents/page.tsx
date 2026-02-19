'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Check, X, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Invoice #2024-001', date: '2024-02-10', status: 'Approved', type: 'Invoice', size: '1.2 MB' },
    { id: 2, name: 'Certificate #2024-002', date: '2024-02-09', status: 'Pending', type: 'Certificate', size: '850 KB' },
    { id: 3, name: 'License #2024-003', date: '2024-02-08', status: 'Approved', type: 'License', size: '2.4 MB' },
    { id: 4, name: 'Tax Document #2023', date: '2024-02-05', status: 'Pending', type: 'Tax', size: '3.1 MB' },
  ]);

  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const handleApprove = (id: number) => {
    setDocuments(documents.map(d => d.id === id ? { ...d, status: 'Approved' } : d));
    if (selectedDoc?.id === id) {
      setSelectedDoc((prev: any) => ({ ...prev, status: 'Approved' }));
    }
  };

  const handleReject = (id: number) => {
    setDocuments(documents.map(d => d.id === id ? { ...d, status: 'Rejected' } : d));
    if (selectedDoc?.id === id) {
      setSelectedDoc((prev: any) => ({ ...prev, status: 'Rejected' }));
    }
  };

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
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Size</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900 flex items-center gap-2">
                  <FileText size={16} className="text-gray-400" />
                  {doc.name}
                </td>
                <td className="py-3 px-4 text-gray-600">{doc.type}</td>
                <td className="py-3 px-4 text-gray-600">{doc.date}</td>
                <td className="py-3 px-4 text-gray-600">{doc.size}</td>
                <td className="py-3 px-4">
                  <Badge variant={
                    doc.status === 'Approved' ? 'outline' :
                      doc.status === 'Rejected' ? 'destructive' : 'secondary'
                  } className={
                    doc.status === 'Approved' ? 'bg-green-100 text-green-800 hover:bg-green-100 border-transparent' :
                      doc.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-transparent' : ''
                  }>
                    {doc.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedDoc(doc)}
                      title="Preview Document"
                    >
                      <Eye size={16} className="mr-1" /> Preview
                    </Button>
                    {doc.status === 'Pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 h-8 w-8 p-0"
                          onClick={() => handleApprove(doc.id)}
                          title="Approve"
                        >
                          <Check size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 h-8 w-8 p-0"
                          onClick={() => handleReject(doc.id)}
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

      <Dialog open={!!selectedDoc} onOpenChange={(open) => !open && setSelectedDoc(null)}>
        <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{selectedDoc?.name}</DialogTitle>
            <DialogDescription>
              Previewing document. {selectedDoc?.type} - {selectedDoc?.size}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 bg-gray-100 rounded-md flex items-center justify-center p-8 border-2 border-dashed border-gray-300">
            <div className="text-center">
              <FileText size={64} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 font-medium">Document Preview Placeholder</p>
              <p className="text-gray-400 text-sm mt-2">
                This is a mock preview for {selectedDoc?.name}.
                <br />
                In a real app, this would display the PDF or Image.
              </p>
            </div>
          </div>

          <DialogFooter className="mt-4">
            {selectedDoc?.status === 'Pending' && (
              <div className="flex gap-2 w-full justify-end">
                <Button
                  variant="destructive"
                  onClick={() => { handleReject(selectedDoc.id); setSelectedDoc(null); }}
                >
                  Reject
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => { handleApprove(selectedDoc.id); setSelectedDoc(null); }}
                >
                  Approve
                </Button>
              </div>
            )}
            <Button variant="secondary" onClick={() => setSelectedDoc(null)}>Close Preview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
