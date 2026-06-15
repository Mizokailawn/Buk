import React from 'react';
import { Shield, User, Car, Laptop, Settings, Eye, Share2, AlertTriangle, Trash2, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  const accountInfo = ["Name", "Email address", "Phone number", "Profile information"];
  const listingInfo = ["Vehicle details", "Photos", "Price information", "Vehicle location", "Contact information"];
  const techInfo = ["Device information", "Browser information", "IP address", "Usage statistics", "Log data"];
  
  const uses = [
    "Provide platform functionality", "Manage user accounts", "Display vehicle listings",
    "Prevent fraud and abuse", "Improve platform performance", "Respond to support requests"
  ];

  return (
    <section className="mx-auto bg-background text-foreground">
      {/* Document Header */}
      <div className="border-b border-gray-200 pb-8 mb-8">
        <div className="flex items-center space-x-3 text-foreground mb-2">
          <Shield className="h-6 w-6" />
          <span className="font-semibold uppercase tracking-wider text-sm">Legal & Trust</span>
        </div>
        <h2 className="text-3xl font-extrabold text-foreground/80 sm:text-4xl">Privacy Policy</h2>
        <p className="text-sm text-muted-foreground mt-2">Last Updated: June 2026</p>
      </div>

      {/* Introduction */}
      <div className="prose max-w-none text-foreground leading-relaxed mb-12 text-lg">
        <p>
          We respect your privacy and are committed to protecting your personal information. 
          This Privacy Policy explains how we collect, use, and protect information when you use our platform.
        </p>
      </div>

      {/* Information We Collect Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <span className="h-2 w-2 bg-purple-500 rounded-full mr-3" />
          Information We Collect
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Account Info */}
          <div className="bg-card p-6 rounded-xl border border-muted-foreground">
            <div className="flex items-center space-x-2 text-muted-foreground font-bold mb-4">
              <User className="h-5 w-5 text-purple-500" />
              <h4>Account Info</h4>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {accountInfo.map((item, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Listing Info */}
          <div className="bg-card p-6 rounded-xl border border-muted-foreground">
            <div className="flex items-center space-x-2 text-muted-foreground font-bold mb-4">
              <User className="h-5 w-5 text-purple-500" />
              <h4>Listing Info</h4>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {listingInfo.map((item, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Info */}
          <div className="bg-card p-6 rounded-xl border border-muted-foreground">
            <div className="flex items-center space-x-2 text-muted-foreground font-bold mb-4">
              <User className="h-5 w-5 text-purple-500" />
              <h4>Technical Info</h4>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {techInfo.map((item, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* How We Use Information */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Settings className="h-6 w-6 text-purple-500 mr-2" />
          How We Use Information
        </h3>
        <div className="bg-card p-6 rounded-xl border border-muted-foreground">
          <ul className="grid sm:grid-cols-2 gap-4">
            {uses.map((use, idx) => (
              <li key={idx} className="flex items-start text-sm text-foreground">
                <span className="text-green-500 font-bold mr-2">✓</span>
                {use}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Two Column Layout for Public & Sharing */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Public Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground flex items-center">
            <Eye className="h-5 w-5 text-purple-500 mr-2" />
            Public Information
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Information included in listings may be visible to the public. This includes vehicle details, photos, location, and seller contact info. 
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg text-xs text-amber-800 flex items-start space-x-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>Users should only publish information they are comfortable sharing publicly.</span>
          </div>
        </div>

        {/* Information Sharing */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground flex items-center">
            <Share2 className="h-5 w-5 text-purple-500 mr-2" />
            Information Sharing
          </h3>
          <p className="text-sm font-semibold text-emerald-700 bg-emerald-50 inline-block px-2 py-1 rounded">
            We do not sell personal information.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We may share information only when required by law, to protect platform security, investigate fraud/abuse, or with trusted service providers that help operate our platform.
          </p>
        </div>
      </div>

      {/* Security & Account Deletion */}
      <div className="grid md:grid-cols-2 gap-8 border-t border-muted-foreground pt-8 mb-12">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-2">Data Security</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We implement reasonable security measures to protect user information. However, no internet-based service can guarantee complete security.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground mb-2 flex items-center">
            <Trash2 className="h-4 w-4 text-red-500 mr-1.5" />
            Account Deletion
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Users may request deletion of their accounts and associated data, subject to legal and operational requirements.
          </p>
        </div>
      </div>

      {/* Contact Footer */}
      <div className="bg-card text-foreground p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <Mail className="h-6 w-6 text-purple-500" />
          <div>
            <h4 className="font-bold">Privacy Inquiries?</h4>
            <p className="text-xs text-foreground">Get in touch with our team regarding your data</p>
          </div>
        </div>
        <a 
          href="mailto:support@yourdomain.com" 
          className="bg-purple-500 hover:bg-purple-700 text-foreground font-medium text-sm px-4 py-2.5 rounded-xl transition duration-200"
        >
          support@yourdomain.com
        </a>
      </div>
    </section>
  );
}