import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SEO from '../components/SEO';
import Header from '../client/src/components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../client/src/hooks/use-auth';
import { Loader2, Share2, Trash2, PlusCircle, Eye } from 'lucide-react';
import { User, Palette, Color } from '../shared/schema';

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { user, isLoading, error } = useAuth();
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [fetchingPalettes, setFetchingPalettes] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [deletingPaletteId, setDeletingPaletteId] = useState<number | null>(null);
  
  useEffect(() => {
    // Redirect if not logged in
    if (!isLoading && !user) {
      router.push('/auth');
    }
  }, [user, isLoading, router]);
  
  // Fetch user's palettes
  useEffect(() => {
    const fetchPalettes = async () => {
      if (!user) return;
      
      try {
        setFetchingPalettes(true);
        const response = await fetch(`/api/palettes?userId=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setPalettes(data);
        } else {
          console.error('Failed to fetch palettes:', await response.text());
        }
      } catch (err) {
        console.error('Error fetching palettes:', err);
      } finally {
        setFetchingPalettes(false);
      }
    };
    
    fetchPalettes();
  }, [user]);
  
  const handleDeletePalette = async (paletteId: number) => {
    if (!user) return;
    
    try {
      setDeletingPaletteId(paletteId);
      const response = await fetch(`/api/palettes/${paletteId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove from local state
        setPalettes(palettes.filter(palette => palette.id !== paletteId));
      } else {
        console.error('Failed to delete palette:', await response.text());
      }
    } catch (err) {
      console.error('Error deleting palette:', err);
    } finally {
      setDeletingPaletteId(null);
    }
  };
  
  const handleSharePalette = (paletteId: number) => {
    const shareUrl = `${window.location.origin}/palette/${paletteId}`;
    setShareUrl(shareUrl);
    setShowShareModal(true);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert('Share link copied to clipboard!');
        setShowShareModal(false);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };
  
  // If loading auth state, show loading spinner
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <SEO title="Loading User Profile | Coolors.in" />
        <Header
          onHelp={() => {}} 
          onExport={() => {}} 
          onSave={() => {}}
          mobileMenuOpen={mobileMenuOpen}
          toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto text-blue-500" />
            <p className="mt-4 text-lg">Loading your profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // If no user, render nothing (will be redirected)
  if (!user) {
    return null;
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SEO 
        title="My Profile | Coolors.in"
        description="View and manage your saved color palettes on Coolors.in."
      />
      
      <Header
        onHelp={() => {}} 
        onExport={() => {}} 
        onSave={() => {}}
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user.username}!</p>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">My Saved Palettes</h2>
            <Link 
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <PlusCircle size={18} className="mr-2" />
              Create New Palette
            </Link>
          </div>
          
          {fetchingPalettes ? (
            <div className="text-center py-10">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
              <p className="mt-2">Loading your palettes...</p>
            </div>
          ) : palettes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {palettes.map(palette => {
                // Parse colors from string to Color array
                const colors: Color[] = JSON.parse(palette.colors);
                
                return (
                  <div key={palette.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Palette preview */}
                    <div className="h-20 flex">
                      {colors.map((color, idx) => (
                        <div 
                          key={idx}
                          className="flex-1" 
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                    
                    {/* Palette details */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{palette.name}</h3>
                      <p className="text-gray-500 text-sm mb-3">
                        Created on {new Date(palette.createdAt).toLocaleDateString()}
                      </p>
                      
                      {/* Action buttons */}
                      <div className="flex justify-between mt-2">
                        <div className="space-x-2">
                          <button
                            onClick={() => handleSharePalette(palette.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            aria-label="Share palette"
                          >
                            <Share2 size={18} />
                          </button>
                          
                          <button
                            onClick={() => handleDeletePalette(palette.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            aria-label="Delete palette"
                            disabled={deletingPaletteId === palette.id}
                          >
                            {deletingPaletteId === palette.id ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                        
                        <Link 
                          href={`/palette/${palette.id}`}
                          className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 mb-4">You haven't saved any palettes yet.</p>
              <Link 
                href="/"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                <PlusCircle size={18} className="mr-2" />
                Create Your First Palette
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Share Palette</h3>
            <p className="text-gray-600 mb-4">Copy the link below to share this palette with others:</p>
            
            <div className="flex">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 border border-gray-300 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={copyToClipboard}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
              >
                Copy
              </button>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;