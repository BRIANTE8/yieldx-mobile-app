'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2 } from 'lucide-react';

interface SignInProps {
  onSignIn: (role: 'farmer' | 'seller' | 'farm-head' | 'market-head') => void;
}

export function SignIn({ onSignIn }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeRole, setActiveRole] = useState<'farmer' | 'seller' | 'farm-head' | 'market-head'>('farmer');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSignIn(activeRole);
    } catch (err) {
      setError('Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    { id: 'farmer', label: 'Farmer', icon: '🌾' },
    { id: 'seller', label: 'Buyer', icon: '🛒' },
    { id: 'farm-head', label: 'Farm Head', icon: '🏢' },
    { id: 'market-head', label: 'Market Head', icon: '🏬' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-50 via-emerald-50 to-teal-100 p-4">
      <Card className="w-full max-w-md border-emerald-200/80 bg-white/95 backdrop-blur-sm shadow-2xl">
        <div className="p-6 sm:p-7">
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">AgroHub</p>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">Welcome Back</h1>
            <p className="text-sm text-gray-600 mt-1">Sign in to access smart agriculture tools</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <Label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 text-sm rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 text-sm rounded-xl"
              />
            </div>

            <div>
              <p className="block text-xs font-semibold text-gray-700 mb-2">I am a:</p>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setActiveRole(role.id as 'farmer' | 'seller' | 'farm-head' | 'market-head')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                      activeRole === role.id
                        ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg'
                        : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                    }`}
                  >
                    <span className="mr-1">{role.icon}</span>
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white h-10 rounded-xl text-sm font-semibold"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-3 text-center">
            <p className="text-xs text-gray-600">
              Don't have an account? <button className="text-emerald-700 hover:text-emerald-800 font-semibold">Sign up</button>
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-emerald-100">
            <p className="text-xs text-gray-500 text-center mb-1">Demo Mode</p>
            <p className="text-xs text-gray-500 text-center">Use any email and password to sign in</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
