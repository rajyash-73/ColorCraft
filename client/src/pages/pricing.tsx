import React, { useState } from 'react';
import { Link } from 'wouter';
import { 
  Check, 
  X, 
  Palette, 
  Eye, 
  Save, 
  Crown, 
  Shirt,
  ArrowLeft,
  CreditCard
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Footer from '@/components/Footer';
import PayPalButton from '@/components/PayPalButton';
import { useToast } from '@/hooks/use-toast';

export default function Pricing() {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [userInfo, setUserInfo] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });
  const [showPayment, setShowPayment] = useState(false);
  const { toast } = useToast();

  const plans = {
    free: {
      name: 'Free',
      price: { USD: '$0', INR: '₹0' },
      period: 'forever',
      features: [
        'Generate up to 7 color palettes',
        'Basic color theory tools',
        'Export as PNG/JSON',
        'Access to FAQ and guides'
      ],
      limitations: [
        'No palette saving',
        'No visualizer access',
        'Limited to 7 palettes',
        'No professional palettes',
        'No cloth color matching'
      ]
    },
    premium: {
      name: 'Premium',
      price: { USD: '$1', INR: '₹100' },
      period: 'per month',
      features: [
        'Unlimited color palette generation',
        'Save and organize palettes',
        'Full visualizer access',
        'Premium professional palettes',
        'Cloth color palette for your style',
        'Dashboard and product color schemes',
        'Priority support',
        'Export in all formats'
      ],
      limitations: []
    }
  };

  const handleSubscriptionSuccess = (subscriptionId: string) => {
    toast({
      title: "Subscription successful!",
      description: "Welcome to Coolors.in Premium! You now have access to all premium features.",
    });
    // Redirect to dashboard or update user state
    window.location.href = '/generate';
  };

  const handleSubscriptionError = (error: any) => {
    toast({
      title: "Subscription failed",
      description: "There was an issue processing your payment. Please try again.",
      variant: "destructive",
    });
  };

  const handleSubscriptionCancel = () => {
    toast({
      title: "Subscription cancelled",
      description: "You cancelled the subscription process.",
    });
  };

  const startSubscription = () => {
    if (!userInfo.email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to continue.",
        variant: "destructive",
      });
      return;
    }
    setShowPayment(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Pricing - Coolors.in Premium Features</title>
        <meta name="description" content="Upgrade to Coolors.in Premium for unlimited palettes, visualizer access, and professional color schemes. Just $1/month or ₹100/month." />
        <meta name="keywords" content="color palette subscription, premium features, pricing, unlimited palettes" />
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">Coolors.in</span>
              </div>
            </Link>
            <Link href="/">
              <a className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </a>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start with our free plan or upgrade to Premium for unlimited access to all features
            </p>
          </div>

          {/* Country Selection */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg p-1 shadow-md border">
              <button
                onClick={() => setSelectedCountry('US')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  selectedCountry === 'US' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                United States (USD)
              </button>
              <button
                onClick={() => setSelectedCountry('IN')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  selectedCountry === 'IN' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                India (INR)
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plans.free.name}</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {plans.free.price[selectedCountry as keyof typeof plans.free.price]}
                </div>
                <p className="text-gray-600">{plans.free.period}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plans.free.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                {plans.free.limitations.map((limitation, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-gray-500">{limitation}</span>
                  </div>
                ))}
              </div>

              <Link href="/generate">
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Get Started Free
                </button>
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-blue-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Most Popular
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plans.premium.name}</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {plans.premium.price[selectedCountry as keyof typeof plans.premium.price]}
                </div>
                <p className="text-gray-600">{plans.premium.period}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plans.premium.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {!showPayment ? (
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First name"
                      value={userInfo.firstName}
                      onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      value={userInfo.lastName}
                      onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={startSubscription}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    Subscribe Now
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <PayPalButton
                    country={selectedCountry}
                    userInfo={userInfo}
                    onSuccess={handleSubscriptionSuccess}
                    onError={handleSubscriptionError}
                    onCancel={handleSubscriptionCancel}
                  />
                  <button
                    onClick={() => setShowPayment(false)}
                    className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors"
                  >
                    ← Back to form
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Premium Features Showcase */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Premium Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Visualizer Access</h3>
                <p className="text-gray-600">Preview your palettes in real website mockups and UI components</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Save className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Palettes</h3>
                <p className="text-gray-600">Save unlimited color palettes and organize your collections</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shirt className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cloth Color Matching</h3>
                <p className="text-gray-600">Get personalized clothing color palettes based on your facial tone and hair color</p>
              </div>
            </div>
          </div>

          {/* Payment Security */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Secure payments processed by PayPal. Cancel anytime.
            </p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
              <span>✓ 256-bit SSL encryption</span>
              <span>✓ PCI DSS compliant</span>
              <span>✓ No hidden fees</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}