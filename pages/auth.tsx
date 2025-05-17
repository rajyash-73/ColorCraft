import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { Eye, EyeOff } from 'lucide-react';

const AuthPage: React.FC = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }
      
      // Success - redirect to home
      router.push('/');
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Head>
        <title>{isLogin ? 'Login' : 'Sign Up'} | Coolors.in</title>
        <meta name="description" content="Log in or create an account to save and share your color palettes." />
      </Head>
      
      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              {isLogin ? 'Welcome Back' : 'Create Your Account'}
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              {isLogin ? "Sign in to access your saved palettes" : "Join to save and share your color palettes"}
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your username"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pr-10"
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>
            
            {error && (
              <div className="rounded-md bg-red-50 p-3">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLogin ? 'Sign in' : 'Create account'}
              </button>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="flex-1 hidden md:block bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-12">
        <div className="max-w-md mx-auto h-full flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Your Color Palette Companion</h2>
          
          <div className="space-y-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Create Beautiful Palettes</h3>
              <p>Generate harmonious color schemes with a single click. Perfect for any design project.</p>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Save & Organize</h3>
              <p>Keep all your color palettes in one place. Easy to find and use whenever you need them.</p>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Share With Others</h3>
              <p>Collaborate by sharing your palettes with clients and team members.</p>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link href="/">
              <a className="text-white bg-opacity-20 bg-white hover:bg-opacity-30 transition-colors px-6 py-3 rounded-lg font-medium">
                Learn more about our features
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;