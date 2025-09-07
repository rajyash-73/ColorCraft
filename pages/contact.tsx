import React from 'react';
import { GetStaticProps } from 'next';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import { generateBreadcrumbSchema, generateContactPageSchema } from '../utils/structuredData';

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://coolors.in' },
    { name: 'Contact', url: 'https://coolors.in/contact' }
  ]);

  const contactSchema = generateContactPageSchema();

  return (
    <>
      <SEO
        title="Contact Us - Get in Touch with Yash"
        description="Get in touch with Yash, the creator of Coolors.in. Contact us for feedback, support, or collaboration opportunities."
        canonical="https://coolors.in/contact"
        keywords="contact, support, feedback, Yash, coolors.in creator, email contact"
        structuredData={[breadcrumbSchema, contactSchema]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <a href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg"></div>
                <span className="text-xl font-bold text-gray-900">Coolors.in</span>
              </a>
              <a 
                href="/" 
                className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                ← Back to Generator
              </a>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
                </li>
                <li className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="text-gray-900 font-medium">Contact</span>
                </li>
              </ol>
            </nav>

            {/* Contact Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Have questions, feedback, or collaboration ideas? I'd love to hear from you!
              </p>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Contact Details */}
              <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Creator</h3>
                      <p className="text-gray-600">Yash</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Passionate about creating beautiful color palettes for designers and developers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a 
                        href="mailto:rajyash73@gmail.com"
                        className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                      >
                        rajyash73@gmail.com
                      </a>
                      <p className="text-sm text-gray-500 mt-1">
                        I typically respond within 24-48 hours
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Form */}
              <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
                
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Connect?</h3>
                  <p className="text-gray-600 mb-6">
                    Click the button below to open your email client with my address pre-filled.
                  </p>
                  <a
                    href="mailto:rajyash73@gmail.com?subject=Hello from Coolors.in visitor&body=Hi Yash,%0D%0A%0D%0AI'm reaching out regarding Coolors.in..."
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Email
                  </a>
                </div>
              </section>
            </div>

            {/* FAQ Section */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What kind of feedback are you looking for?</h3>
                  <p className="text-gray-600">
                    I welcome all types of feedback including bug reports, feature suggestions, usability improvements, or general thoughts about the application.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Can I contribute to the project?</h3>
                  <p className="text-gray-600">
                    Absolutely! If you're interested in contributing code, design ideas, or other improvements, please reach out via email to discuss collaboration opportunities.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">How quickly can I expect a response?</h3>
                  <p className="text-gray-600">
                    I aim to respond to all emails within 24-48 hours. For urgent matters, please mention it in your subject line.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 86400, // Revalidate every 24 hours
  };
};