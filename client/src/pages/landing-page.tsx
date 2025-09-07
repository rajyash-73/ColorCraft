import React from 'react';
import { Link } from 'wouter';
import { Palette, Smartphone, Monitor, Plug, Chrome, Download, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Palette className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Coolors</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/generate" className="text-gray-600 hover:text-gray-900">Palette Generator</Link>
              <Link href="/palettes" className="text-gray-600 hover:text-gray-900">Explore Palettes</Link>
              <Link href="/image-picker" className="text-gray-600 hover:text-gray-900">Image Picker</Link>
              <Link href="/fonts" className="text-gray-600 hover:text-gray-900">Fonts</Link>
              <Link href="/clothing-palette" className="text-gray-600 hover:text-gray-900">Clothing Palette</Link>
              <Link href="/auth" className="text-gray-600 hover:text-gray-900">Sign in</Link>
              <Link href="/auth">
                <Button>Sign up</Button>
              </Link>
            </nav>

            <div className="md:hidden">
              <Link href="/auth">
                <Button size="sm">Sign in</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            The super fast color palettes generator!
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Create the perfect palette or get inspired by thousands of beautiful color schemes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/generate">
              <Button size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">
                Start the generator!
              </Button>
            </Link>
            <Link href="/palettes">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">
                Explore trending palettes
              </Button>
            </Link>
          </div>

          {/* Quick Color Generator Preview */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-16">
            <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
              <div className="h-20 bg-blue-500 rounded-lg flex items-end justify-center pb-2">
                <span className="text-xs text-white font-medium">#3B82F6</span>
              </div>
              <div className="h-20 bg-green-500 rounded-lg flex items-end justify-center pb-2">
                <span className="text-xs text-white font-medium">#10B981</span>
              </div>
              <div className="h-20 bg-yellow-400 rounded-lg flex items-end justify-center pb-2">
                <span className="text-xs text-black font-medium">#F59E0B</span>
              </div>
              <div className="h-20 bg-red-500 rounded-lg flex items-end justify-center pb-2">
                <span className="text-xs text-white font-medium">#EF4444</span>
              </div>
              <div className="h-20 bg-purple-500 rounded-lg flex items-end justify-center pb-2">
                <span className="text-xs text-white font-medium">#8B5CF6</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">Press the spacebar to generate a new palette!</p>
          </div>
        </div>
      </section>

      {/* Apps & Extensions Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <Smartphone className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">iOS App</h3>
              <p className="text-sm text-gray-600 mb-4">Create, browse and save palettes on the go.</p>
              <Button variant="outline" size="sm" className="w-full">
                View on App Store
              </Button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <Smartphone className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Android App</h3>
              <p className="text-sm text-gray-600 mb-4">Thousands of palettes in your pocket.</p>
              <Button variant="outline" size="sm" className="w-full">
                View on Play Store
              </Button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <Monitor className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Figma Plugin</h3>
              <p className="text-sm text-gray-600 mb-4">All palettes right in your workspace.</p>
              <Button variant="outline" size="sm" className="w-full">
                Install now
              </Button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <Chrome className="h-8 w-8 text-orange-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Chrome Extension</h3>
              <p className="text-sm text-gray-600 mb-4">Get and edit a palette every new tab.</p>
              <Button variant="outline" size="sm" className="w-full">
                Add to Chrome
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Used by 5+ million designers and by top companies
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-8 mt-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">Netflix</div>
            <div className="text-2xl font-bold text-gray-400">Microsoft</div>
            <div className="text-2xl font-bold text-gray-400">DreamWorks</div>
            <div className="text-2xl font-bold text-gray-400">Ubisoft</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need for color exploration
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From palette generation to color analysis, we've got all the tools you need to create beautiful designs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Palette Generator</h3>
              <p className="text-gray-600">Generate beautiful color palettes with a single click</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Image Picker</h3>
              <p className="text-gray-600">Extract colors from any image to create custom palettes</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Explore Palettes</h3>
              <p className="text-gray-600">Browse thousands of palettes created by the community</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shirt className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Clothing Palette</h3>
              <p className="text-gray-600">Discover clothing colors that complement your skin tone</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Palette className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">Coolors</span>
              </div>
              <p className="text-gray-400 text-sm">
                The super fast color palettes generator for designers and developers.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/generate" className="hover:text-white">Palette Generator</Link></li>
                <li><Link href="/palettes" className="hover:text-white">Explore Palettes</Link></li>
                <li><Link href="/image-picker" className="hover:text-white">Image Picker</Link></li>
                <li><Link href="/fonts" className="hover:text-white">Fonts</Link></li>
                <li><Link href="/clothing-palette" className="hover:text-white">Clothing Palette</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Apps</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">iOS App</a></li>
                <li><a href="#" className="hover:text-white">Android App</a></li>
                <li><a href="#" className="hover:text-white">Figma Plugin</a></li>
                <li><a href="#" className="hover:text-white">Chrome Extension</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/auth" className="hover:text-white">Sign In</Link></li>
                <li><Link href="/auth" className="hover:text-white">Sign Up</Link></li>
                <li><a href="#" className="hover:text-white">Go Pro</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Coolors. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}