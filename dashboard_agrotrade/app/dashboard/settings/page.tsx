'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, ShieldCheck, Bell, Moon, Check } from 'lucide-react';

export default function SettingsPage() {
  // Simple state to show a "Saved!" animation on the buttons
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // Toggle states for System Preferences
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);

  const handleSaveProfile = () => {
    setIsSavingProfile(true);
    setTimeout(() => setIsSavingProfile(false), 1500);
  };

  const handleUpdatePassword = () => {
    setIsSavingPassword(true);
    setTimeout(() => setIsSavingPassword(false), 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-500 mt-2">Manage your portal preferences and security</p>
      </div>

      {/* 1. Account Settings */}
      <Card className="border-0 shadow-sm bg-white overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <User className="text-green-700" size={20} />
            Profile Information
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input 
                type="text" 
                defaultValue="Super Admin" 
                className="h-10 focus-visible:ring-green-600" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input 
                type="email" 
                defaultValue="admin@agrotrade.dz" 
                className="h-10 focus-visible:ring-green-600" 
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleSaveProfile}
              className={`min-w-[140px] transition-colors ${isSavingProfile ? 'bg-green-500 hover:bg-green-500' : 'bg-green-700 hover:bg-green-800'} text-white`}
            >
              {isSavingProfile ? (
                <><Check size={18} className="mr-2" /> Saved!</>
              ) : (
                'Save Profile'
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* 2. Security Settings */}
      <Card className="border-0 shadow-sm bg-white overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheck className="text-green-700" size={20} />
            Security & Password
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2 max-w-md">
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <Input type="password" placeholder="••••••••" className="h-10 focus-visible:ring-green-600" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <Input type="password" placeholder="Enter new password" className="h-10 focus-visible:ring-green-600" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input type="password" placeholder="Confirm new password" className="h-10 focus-visible:ring-green-600" />
            </div>
          </div>
          <div className="mt-6">
            <Button 
              onClick={handleUpdatePassword}
              className={`min-w-[160px] transition-colors ${isSavingPassword ? 'bg-green-500 hover:bg-green-500' : 'bg-gray-900 hover:bg-gray-800'} text-white`}
            >
              {isSavingPassword ? (
                <><Check size={18} className="mr-2" /> Updated!</>
              ) : (
                'Update Password'
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* 3. System Preferences */}
      <Card className="border-0 shadow-sm bg-white overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Bell className="text-green-700" size={20} />
            System Preferences
          </h2>
        </div>
        <div className="p-6 space-y-6">
          
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                <Moon size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Dark Mode</p>
                <p className="text-sm text-gray-500">Enable dark theme for the admin dashboard</p>
              </div>
            </div>
            {/* Custom Tailwind Toggle Switch */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 ${darkMode ? 'bg-green-600' : 'bg-gray-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Email Notifications Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                <Bell size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive alerts for new users, products, and documents</p>
              </div>
            </div>
            {/* Custom Tailwind Toggle Switch */}
            <button 
              onClick={() => setEmailNotifs(!emailNotifs)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 ${emailNotifs ? 'bg-green-600' : 'bg-gray-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${emailNotifs ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

        </div>
      </Card>

    </div>
  );
}