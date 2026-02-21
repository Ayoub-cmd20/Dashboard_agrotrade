'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, BarChart3, FileText, Factory, Package, Users, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: BarChart3,
  },
  {
    href: '/dashboard/documents',
    label: 'Documents',
    icon: FileText,
  },
  {
    href: '/dashboard/products',
    label: 'Products',
    icon: Package,
  },
  {
    href: '/dashboard/factory_details',
    label: 'Factory Details',
    icon: Factory,
  },
  {
    href: '/dashboard/seller_details',
    label: 'Seller Details',
    icon: Users,
  },
  {
    href: '/dashboard/users',
    label: 'Users',
    icon: Users,
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminEmail');
    router.push('/auth/login');
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-green-900 to-green-800 text-white shadow-xl transition-all duration-300 ease-in-out z-40 ${isOpen ? 'w-64' : 'w-20'
        }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-green-700">
        {isOpen && (
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
            🌿 Agrotrade
          </h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-white hover:bg-green-700"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${active
                  ? 'bg-white/20 border-l-4 border-white font-semibold'
                  : 'hover:bg-white/10 border-l-4 border-transparent'
                }`}
              title={!isOpen ? item.label : ''}
            >
              <Icon size={20} className="flex-shrink-0" />
              {isOpen && <span className="text-sm">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-700 space-y-2">
        {isOpen && (
          <p className="text-xs text-green-200 text-center mb-2">
            🌾 Dashboard Agrotrade
          </p>
        )}
        <Button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
          size="sm"
        >
          <LogOut size={16} />
          {isOpen && 'Logout'}
        </Button>
      </div>
    </aside>
  );
}
