import React from 'react';
import { Link } from 'wouter';
import { Palette, Download, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header/Navigation */}
      <header className="backdrop-blur-sm bg-white/80 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Palette className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Coolors.in</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/generate" className="text-slate-700 hover:text-indigo-600 font-medium transition-colors">Palette Generator</Link>
              <Link href="/palettes" className="text-slate-700 hover:text-indigo-600 font-medium transition-colors">Explore Palettes</Link>
              <Link href="/image-picker" className="text-slate-700 hover:text-indigo-600 font-medium transition-colors">Image Picker</Link>
              <Link href="/fonts" className="text-slate-700 hover:text-indigo-600 font-medium transition-colors">Fonts</Link>
              <Link href="/clothing-palette" className="text-slate-700 hover:text-indigo-600 font-medium transition-colors">Clothing Palette</Link>
            </nav>

            <div className="md:hidden">
              <Link href="/generate">
                <Button size="sm">Start Creating</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-8 leading-tight">
            The super fast color palettes generator!
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Create the perfect palette or get inspired by thousands of beautiful color schemes with our modern, intuitive tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/generate">
              <Button size="lg" className="w-full sm:w-auto px-10 py-4 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Start the generator!
              </Button>
            </Link>
            <Link href="/palettes">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 py-4 text-lg font-semibold border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 shadow-md hover:shadow-lg transition-all duration-300">
                Explore trending palettes
              </Button>
            </Link>
          </div>

          {/* Quick Color Generator Preview */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 mb-20 shadow-xl border border-white/20">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6">Try it instantly</h3>
            <div className="grid grid-cols-5 gap-3 max-w-lg mx-auto">
              <div className="h-24 bg-gradient-to-b from-blue-400 to-blue-600 rounded-xl flex items-end justify-center pb-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <span className="text-xs text-white font-semibold">#3B82F6</span>
              </div>
              <div className="h-24 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-xl flex items-end justify-center pb-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <span className="text-xs text-white font-semibold">#10B981</span>
              </div>
              <div className="h-24 bg-gradient-to-b from-amber-300 to-amber-500 rounded-xl flex items-end justify-center pb-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <span className="text-xs text-amber-900 font-semibold">#F59E0B</span>
              </div>
              <div className="h-24 bg-gradient-to-b from-rose-400 to-rose-600 rounded-xl flex items-end justify-center pb-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <span className="text-xs text-white font-semibold">#EF4444</span>
              </div>
              <div className="h-24 bg-gradient-to-b from-violet-400 to-violet-600 rounded-xl flex items-end justify-center pb-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <span className="text-xs text-white font-semibold">#8B5CF6</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">Press the spacebar to generate a new palette!</p>
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
                <Palette className="h-8 w-8 text-purple-600" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/generate" className="hover:text-white">Get Started</Link></li>
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