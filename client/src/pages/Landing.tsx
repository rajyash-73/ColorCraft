import React from 'react';
import { Link } from 'wouter';
import { 
  RefreshCw, 
  Eye, 
  Image as ImageIcon, 
  BookOpen, 
  HelpCircle, 
  Palette, 
  ArrowRight,
  Star,
  Users,
  Zap,
  Shield
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Footer from '@/components/Footer';

export default function Landing() {
  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Smart Palette Generator",
      description: "Create beautiful color combinations using advanced color theory algorithms",
      href: "/generate",
      gradient: "from-blue-500 to-indigo-600",
      stats: "10K+ palettes generated"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Design Visualizer", 
      description: "See your color palettes in real website mockups and UI components",
      href: "/visualize",
      gradient: "from-emerald-500 to-teal-600",
      stats: "50+ templates"
    },
    {
      icon: <ImageIcon className="w-8 h-8" />,
      title: "Image to Palette",
      description: "Extract perfect color schemes from any image using AI-powered analysis",
      href: "/image-palette", 
      gradient: "from-purple-500 to-pink-600",
      stats: "Instant extraction"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Designer's Guide",
      description: "Learn color theory fundamentals and professional design techniques",
      href: "/designers-guide",
      gradient: "from-orange-500 to-red-600",
      stats: "Expert tips"
    },
    {
      icon: <HelpCircle className="w-8 h-8" />,
      title: "FAQ & Support",
      description: "Find answers to common questions and get help with your projects",
      href: "/faq",
      gradient: "from-cyan-500 to-blue-600",
      stats: "Quick answers"
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      title: "Lightning Fast",
      description: "Generate palettes instantly with our optimized algorithms"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Designer Approved",
      description: "Used by thousands of designers and developers worldwide"
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Always Free",
      description: "No subscriptions, no limits - completely free to use forever"
    },
    {
      icon: <Star className="w-6 h-6 text-purple-600" />,
      title: "Professional Quality",
      description: "Export-ready palettes for all your design projects"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Coolors.in - Professional Color Palette Generator | Free Design Tools</title>
        <meta name="description" content="Create stunning color palettes, visualize designs, and extract colors from images. Free professional tools for designers and developers." />
        <meta name="keywords" content="color palette generator, color scheme, design tools, color picker, palette visualizer" />
        <link rel="canonical" href="https://coolors.in/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication", 
            "name": "Coolors.in",
            "url": "https://coolors.in/",
            "description": "Professional color palette generator and design tools",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Coolors.in
                </h1>
                <p className="text-sm text-gray-500">Professional Color Tools</p>
              </div>
            </div>
            <Link href="/generate">
              <a className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all font-medium shadow-lg">
                Get Started Free
              </a>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 md:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Create <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Beautiful</span> Color Palettes in Seconds
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Professional color palette generator with advanced color theory, real-time visualization, and image analysis. 
              Everything you need to design with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/generate">
                <a className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-xl flex items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Start Creating Palettes
                </a>
              </Link>
              <Link href="/visualize">
                <a className="bg-white text-gray-700 border-2 border-gray-200 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2">
                  <Eye className="w-5 h-5" />
                  Try Visualizer
                </a>
              </Link>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Color Design
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From generating palettes to visualizing designs, our comprehensive suite of tools has you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <a className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      {feature.stats}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Create Amazing Designs?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of designers who trust Coolors.in for their color palette needs. 
              Start creating beautiful color combinations today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/generate">
                <a className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all shadow-xl flex items-center justify-center gap-2">
                  <Palette className="w-5 h-5" />
                  Generate Your First Palette
                </a>
              </Link>
              <Link href="/designers-guide">
                <a className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Learn Color Theory
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}