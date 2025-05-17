import React, { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Trash2, Eye, Clipboard, Check } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import { useAuth } from '../client/src/hooks/use-auth';
import { Color, Palette } from '../shared/schema';

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [copiedId, setCopiedId] = useState<number | null>(null);
  
  // Redirect to login if not authenticated
  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/auth');
    }
    return null;
  }
  
  // Fetch user's palettes
  const { data: palettes, isLoading, error, refetch } = useQuery<Palette[]>({
    queryKey: ['/api/palettes'],
    enabled: !!user,
  });
  
  // Delete palette mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/palettes/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete palette');
      }
    },
    onSuccess: () => {
      // Refetch palettes after deletion
      refetch();
    },
  });
  
  // Handle delete palette
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this palette?')) {
      deleteMutation.mutate(id);
    }
  };
  
  // Handle copy share link
  const handleCopyShareLink = (id: number) => {
    const shareUrl = `${window.location.origin}/palette/${id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  // Parse colors from JSON string
  const parseColors = (colorsJson: string): Color[] => {
    try {
      return JSON.parse(colorsJson);
    } catch (err) {
      console.error('Error parsing colors:', err);
      return [];
    }
  };
  
  return (
    <>
      <SEO 
        title="My Profile | Coolors.in"
        description="View and manage your saved color palettes on Coolors.in"
      />
      
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Palettes</h1>
            <p className="text-gray-600 mt-2">
              View, manage, and share your saved color palettes
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center my-12">
              <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
              <p className="text-red-700">
                Error loading palettes. Please try again later.
              </p>
            </div>
          ) : palettes && palettes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {palettes.map((palette) => {
                const colors = parseColors(palette.colors);
                
                return (
                  <div key={palette.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Palette preview */}
                    <div className="h-24 flex">
                      {colors.map((color, index) => (
                        <div
                          key={index}
                          className="flex-1"
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                    
                    {/* Palette info */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {palette.name}
                      </h3>
                      
                      <p className="text-sm text-gray-500 mb-4">
                        Created on {new Date(palette.createdAt).toLocaleDateString()}
                      </p>
                      
                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/palette/${palette.id}`}
                          className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
                        >
                          <Eye size={16} className="mr-1.5" />
                          View
                        </Link>
                        
                        <Link
                          href={`/visualizer?palette=${encodeURIComponent(palette.colors)}`}
                          className="inline-flex items-center px-3 py-1.5 text-sm bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="3" y1="9" x2="21" y2="9"></line>
                            <line x1="9" y1="21" x2="9" y2="9"></line>
                          </svg>
                          Visualize
                        </Link>
                        
                        <button
                          onClick={() => handleCopyShareLink(palette.id)}
                          className="inline-flex items-center px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors"
                        >
                          {copiedId === palette.id ? (
                            <>
                              <Check size={16} className="mr-1.5" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Clipboard size={16} className="mr-1.5" />
                              Share
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={() => handleDelete(palette.id)}
                          className="inline-flex items-center px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors ml-auto"
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 size={16} className="mr-1.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No palettes saved yet</h3>
              <p className="text-gray-600 mb-4">
                Start creating and saving color palettes to view them here.
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create a Palette
              </Link>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ProfilePage;