import { Card } from '@/components/ui/card';
import { BarChart3, FileText, Package, Users } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: Users,
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Total Products',
      value: '567',
      icon: Package,
      color: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Documents',
      value: '89',
      icon: FileText,
      color: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Factories',
      value: '12',
      icon: BarChart3,
      color: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back to Agrotrade Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className={`p-6 ${stat.color} border-0`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-white`}>
                  <Icon size={24} className={stat.iconColor} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-900">New product added</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
              Completed
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-900">User registration updated</p>
              <p className="text-xs text-gray-500">5 hours ago</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
              Pending
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-gray-900">Document review completed</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
              Completed
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
