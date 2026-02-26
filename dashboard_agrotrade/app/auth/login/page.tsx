'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Lock, Mail, Sprout, KeyRound, ShieldQuestion, Send } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // States for the new Modals
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  // Temporary success states for forms
  const [resetSent, setResetSent] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store auth token
      localStorage.setItem('authToken', 'demo-token-' + Date.now());
      localStorage.setItem('adminEmail', email);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setIsForgotModalOpen(false);
      setResetSent(false);
    }, 2000);
  };

  const handleContactAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
    setTimeout(() => {
      setIsContactModalOpen(false);
      setRequestSent(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-gray-50 to-emerald-100 p-4">
      <Card className="w-full max-w-md p-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-700 text-white p-3 rounded-xl shadow-md">
              <Sprout size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">AgroTrade Admin</h1>
          <p className="text-gray-500 text-sm">Sign in to manage the platform</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <Input
                id="email"
                type="email"
                placeholder="admin@agrotrade.dz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 h-10 border-gray-200 focus-visible:ring-green-600"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 h-10 border-gray-200 focus-visible:ring-green-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-600 cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600 cursor-pointer">
                Remember me
              </label>
            </div>
            {/* Opens Forgot Password Modal */}
            <button 
              type="button" 
              onClick={() => setIsForgotModalOpen(true)}
              className="text-sm font-medium text-green-700 hover:text-green-800 focus:outline-none"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 mt-4 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-xs">
            Protected by AgroTrade Security. <br/>
            Need access?{' '}
            {/* Opens Contact Admin Modal */}
            <button 
              type="button" 
              onClick={() => setIsContactModalOpen(true)}
              className="text-green-700 hover:underline font-medium focus:outline-none mt-1"
            >
              Contact System Admin
            </button>
          </p>
        </div>
      </Card>

      {/* ========================================= */}
      {/* MODAL 1: Forgot Password                  */}
      {/* ========================================= */}
      <Dialog open={isForgotModalOpen} onOpenChange={setIsForgotModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <KeyRound className="text-green-700" size={20} /> Reset Password
            </DialogTitle>
            <DialogDescription>
              Enter your admin email address and we will send you a secure link to reset your password.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleForgotPassword} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <Input required type="email" placeholder="admin@agrotrade.dz" className="focus-visible:ring-green-600" />
            </div>
            
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsForgotModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={resetSent} className={`${resetSent ? 'bg-green-500' : 'bg-green-700 hover:bg-green-800'} text-white w-32`}>
                {resetSent ? 'Link Sent!' : 'Send Link'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ========================================= */}
      {/* MODAL 2: Request Access / Contact Admin   */}
      {/* ========================================= */}
      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <ShieldQuestion className="text-green-700" size={20} /> Request Access
            </DialogTitle>
            <DialogDescription>
              Do not have an admin account? Submit a request to the Super Admin for dashboard credentials.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleContactAdmin} className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <Input required type="text" placeholder="e.g. Derbale Fayssal" className="focus-visible:ring-green-600" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Work Email</label>
              <Input required type="email" placeholder="name@agrotrade.dz" className="focus-visible:ring-green-600" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Reason for Access</label>
              <textarea 
                required 
                rows={3} 
                placeholder="Briefly explain your role..." 
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none" 
              />
            </div>
            
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsContactModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={requestSent} className={`${requestSent ? 'bg-green-500' : 'bg-green-700 hover:bg-green-800'} text-white w-36`}>
                {requestSent ? 'Request Sent!' : <><Send size={16} className="mr-2" /> Send Request</>}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}