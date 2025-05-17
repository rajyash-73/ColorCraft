import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../hooks/use-auth';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Form validation schema
const authSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password cannot exceed 50 characters"),
});

type AuthFormValues = z.infer<typeof authSchema>;

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [, navigate] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();
  
  // Create form with validation
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  
  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  // Handle form submission
  const onSubmit = async (data: AuthFormValues) => {
    if (isLogin) {
      loginMutation.mutate(data);
    } else {
      registerMutation.mutate(data);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              {isLogin ? 'Welcome Back' : 'Create Your Account'}
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              {isLogin ? "Sign in to access your saved palettes" : "Join to save and share your color palettes"}
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  {...form.register('username')}
                  disabled={loginMutation.isPending || registerMutation.isPending}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  {...form.register('password')}
                  disabled={loginMutation.isPending || registerMutation.isPending}
                />
              </div>
            </div>
            
            {/* Form validation errors */}
            {(form.formState.errors.username || form.formState.errors.password) && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">There were errors with your submission</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <ul className="list-disc pl-5 space-y-1">
                        {form.formState.errors.username && (
                          <li>{form.formState.errors.username.message}</li>
                        )}
                        {form.formState.errors.password && (
                          <li>{form.formState.errors.password.message}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* API errors */}
            {(loginMutation.error || registerMutation.error) && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Authentication error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{isLogin ? loginMutation.error?.message : registerMutation.error?.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loginMutation.isPending || registerMutation.isPending}
              >
                {(loginMutation.isPending || registerMutation.isPending) ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLogin ? "Sign in" : "Create account"}
              </button>
            </div>
            
            <div className="text-center">
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)} 
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Hero/Information Section */}
      <div className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-12 hidden md:flex md:flex-col md:justify-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-6">Coolors.in</h2>
          <h3 className="text-xl font-semibold mb-4">Your Color Palette Companion</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <svg className="h-6 w-6 mr-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p>Generate beautiful color schemes with a single click</p>
            </div>
            
            <div className="flex items-start">
              <svg className="h-6 w-6 mr-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p>Save your favorite palettes to your account</p>
            </div>
            
            <div className="flex items-start">
              <svg className="h-6 w-6 mr-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p>Share your palettes with others via unique links</p>
            </div>
            
            <div className="flex items-start">
              <svg className="h-6 w-6 mr-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p>Visualize how your palettes look in real UI components</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;