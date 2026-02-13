import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-2">Manage your account and system settings</p>
      </div>

      {/* Account Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Name
            </label>
            <Input type="text" placeholder="Enter your name" className="h-10" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input type="email" placeholder="Enter your email" className="h-10" />
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Security</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <Input type="password" placeholder="Enter current password" className="h-10" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <Input type="password" placeholder="Enter new password" className="h-10" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <Input type="password" placeholder="Confirm new password" className="h-10" />
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Update Password
          </Button>
        </div>
      </Card>

      {/* System Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">System Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Dark Mode</p>
              <p className="text-sm text-gray-500">Enable dark theme for dashboard</p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive email alerts for important events</p>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </div>
        </div>
      </Card>
    </div>
  );
}
