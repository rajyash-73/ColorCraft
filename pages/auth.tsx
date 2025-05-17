import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEO from '../components/SEO';
import { useAuth } from '../client/src/hooks/use-auth';
import { Loader2, User } from 'lucide-react';
import { z } from 'zod';

// Define the form validation schema
const authSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username cannot exceed 20 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormValues = z.infer<typeof authSchema>;

const AuthPage: NextPage = () => {
  const router = useRouter();
  const { user, isLoading, loginMutation, registerMutation } = useAuth();
  
  // Form state
  const [isLogin, setIsLogin] = useState(true);
  const [formValues, setFormValues] = useState<AuthFormValues>({
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof AuthFormValues, string>>>({});
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    
    // Clear the error for this field when user types
    if (formErrors[name as keyof AuthFormValues]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      });
    }
  };
  
  // Validate form and return true if valid
  const validateForm = () => {
    try {
      authSchema.parse(formValues);
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof AuthFormValues, string>> = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof AuthFormValues;
          newErrors[path] = err.message;
        });
        setFormErrors(newErrors);
      }
      return false;
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Call the appropriate mutation
    if (isLogin) {
      loginMutation.mutate(formValues);
    } else {
      registerMutation.mutate(formValues);
    }
  };
  
  // If already logged in, don't render the form
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
        <SEO 
          title="Loading | Coolors.in"
          description="Loading authentication state"
        />
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }
  
  // If user is logged in, don't render the form (we will redirect)
  if (user) {
    return null;
  }
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SEO 
        title={isLogin ? "Log In | Coolors.in" : "Sign Up | Coolors.in"}
        description="Sign up or log in to save your color palettes and access your favorites from anywhere."
      />
      
      {/* Auth Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link href="/" className="flex justify-center">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              Coolors.in
            </h1>
          </Link>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isLogin ? 'Log in to your account' : 'Create a new account'}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formValues.username}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${
                    formErrors.username ? 'ring-red-300' : 'ring-gray-300'
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
                />
                {formErrors.username && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.username}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  value={formValues.password}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${
                    formErrors.password ? 'ring-red-300' : 'ring-gray-300'
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
                />
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loginMutation.isPending || registerMutation.isPending}
                className="flex w-full justify-center items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70"
              >
                {loginMutation.isPending || registerMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {isLogin ? 'Logging in...' : 'Creating account...'}
                  </>
                ) : (
                  isLogin ? 'Log in' : 'Create account'
                )}
              </button>
            </div>
            
            {/* Login/Register error messages */}
            {(loginMutation.isError || registerMutation.isError) && (
              <div className="rounded-md bg-red-50 p-3">
                <div className="flex">
                  <div className="text-sm text-red-700">
                    {loginMutation.error?.message || registerMutation.error?.message || 'An error occurred'}
                  </div>
                </div>
              </div>
            )}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              {isLogin ? 'Create a new account' : 'Log in to existing account'}
            </button>
          </p>
          
          <div className="mt-10 pt-6 border-t border-gray-200">
            <Link 
              href="/"
              className="block w-full text-center text-sm text-gray-500 hover:text-gray-700"
            >
              Continue without an account
            </Link>
          </div>
        </div>
      </div>
      
      {/* Hero section */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-r from-blue-600 to-purple-700 flex-col justify-center text-white px-12">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-6">Save & Share Your Color Palettes</h2>
          <p className="text-lg mb-8">
            Create an account to save your favorite color combinations and access them from anywhere. Share your palettes with colleagues and friends.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="rounded-full bg-white/20 p-2 mr-4">
                <User size={20} />
              </div>
              <div>
                <h3 className="font-medium">Personal Profile</h3>
                <p className="text-white/80 text-sm">Save and organize your palettes</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="rounded-full bg-white/20 p-2 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M6 8h.01" />
                  <path d="M10 8h.01" />
                  <path d="M14 8h.01" />
                  <path d="M18 8h.01" />
                  <path d="M8 12h.01" />
                  <path d="M12 12h.01" />
                  <path d="M16 12h.01" />
                  <path d="M7 16h10" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Color Collections</h3>
                <p className="text-white/80 text-sm">Organize palettes into projects</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="rounded-full bg-white/20 p-2 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Easy Sharing</h3>
                <p className="text-white/80 text-sm">Share with anyone via URL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;