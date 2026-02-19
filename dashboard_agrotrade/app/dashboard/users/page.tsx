'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Check, X } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Active' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'User', status: 'Inactive' },
    { id: 5, name: 'Robert Brown', email: 'robert@example.com', role: 'User', status: 'Pending' },
  ]);

  const [filterRole, setFilterRole] = useState('All');

  const handleApprove = (id: number) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: 'Active' } : user
    ));
  };

  const handleReject = (id: number) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: 'Rejected' } : user
    ));
  };

  const filteredUsers = users.filter(user =>
    filterRole === 'All' || user.role === filterRole
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 mt-2">Manage all users</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
          <Plus size={18} className="mr-2" />
          Add User
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Filter by Role:</span>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
            <SelectItem value="User">User</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900 font-medium">{user.name}</td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={
                        user.status === 'Active' ? 'outline' :
                          user.status === 'Rejected' ? 'destructive' : 'outline'
                      } className={
                        user.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100 border-transparent' :
                          user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-transparent' : ''
                      }>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {user.status !== 'Active' && user.status !== 'Rejected' && (
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 h-8 w-8 p-0"
                            onClick={() => handleApprove(user.id)}
                            title="Approve"
                          >
                            <Check size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 h-8 w-8 p-0"
                            onClick={() => handleReject(user.id)}
                            title="Reject"
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No users found matching filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
