import React from 'react';
import { 
  Scale, 
  UserCheck, 
  AlertOctagon, 
  Ban, 
  XCircle, 
  UserX, 
  MessageSquareOff, 
  ShieldAlert, 
  HelpCircle 
} from 'lucide-react';

export default function TermsAndConditions() {
  const accountResponsibilities = [
    "Maintaining account security",
    "Keeping account information accurate",
    "Activities occurring under your account"
  ];

  const listingRules = [
    "Be accurate",
    "Contain truthful information",
    "Use genuine photographs",
    "Not contain misleading claims"
  ];

  const prohibitedContent = [
    "Advertise stolen vehicles",
    "Post false or misleading information",
    "Upload illegal content",
    "Impersonate another person",
    "Use automated systems to abuse the platform",
    "Violate applicable laws"
  ];

  const platformLimitations = [
    "Do not sell or purchase vehicles",
    "Do not facilitate transactions or collect payments",
    "Do not provide escrow services",
    "Do not inspect vehicles or verify ownership",
    "Do not guarantee listing accuracy"
  ];

  const buyerResponsibilities = [
    "Inspecting vehicles physically",
    "Verifying legal ownership status",
    "Confirming actual vehicle condition",
    "Reviewing registration documents",
    "Completing any necessary due diligence"
  ];

  const sellerResponsibilities = [
    "Ensuring overall listing accuracy",
    "Verifying clear title and ownership",
    "Compliance with local and national laws",
    "Direct communication with interested buyers",
    "Completing any legal transfer requirements"
  ];

  const noWarranties = [
    "Listing accuracy",
    "Vehicle quality",
    "Seller legitimacy",
    "Buyer legitimacy",
    "Transaction outcomes"
  ];

  return (
    <section className="mx-auto bg-background text-foreground max-w-5xl">
      {/* Document Header */}
      <div className="border-b border-gray-200 pb-8 mb-8">
        <div className="flex items-center space-x-3 text-foreground mb-2">
          <Scale className="h-6 w-6 text-purple-500" />
          <span className="font-semibold uppercase tracking-wider text-sm">Legal Framework</span>
        </div>
        <h2 className="text-3xl font-extrabold text-foreground/80 sm:text-4xl">Terms and Conditions</h2>
        <p className="text-sm text-muted-foreground mt-2">Last Updated: June 2026</p>
      </div>

      {/* Acceptance of Terms & Eligibility */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="md:col-span-2 bg-card p-6 rounded-xl border border-muted-foreground">
          <h3 className="text-lg font-bold mb-2 flex items-center">
            <UserCheck className="h-5 w-5 text-purple-500 mr-2" />
            Acceptance of Terms
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            By accessing or using our platform, you agree to these Terms and Conditions. 
            If you do not agree with any part of these rules, you should stop using the platform immediately.
          </p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-muted-foreground flex flex-col justify-center">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-500 mb-1">Age Requirement</h3>
          <p className="text-2xl font-extrabold text-foreground/80">Minimum 18+</p>
          <p className="text-xs text-muted-foreground mt-1">Required to create accounts, listings, or use seller tools.</p>
        </div>
      </div>

      {/* Accounts & Listings */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* User Accounts */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center">
            <span className="h-2 w-2 bg-purple-500 rounded-full mr-3" />
            User Accounts
          </h3>
          <p className="text-sm text-muted-foreground">
            To create a listing, users must create an authenticated account. You are solely responsible for:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground pl-1">
            {accountResponsibilities.map((item, idx) => (
              <li key={idx} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Vehicle Listings */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center">
            <span className="h-2 w-2 bg-purple-500 rounded-full mr-3" />
            Vehicle Listings
          </h3>
          <p className="text-sm text-muted-foreground">
            Listings may only be generated for vehicles you own or are legally authorized to market. All listings must:
          </p>
          <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            {listingRules.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-purple-500 font-bold mr-1.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Prohibited Content & Platform Role Warning */}
      <div className="grid md:grid-cols-12 gap-8 mb-12">
        {/* Prohibited */}
        <div className="md:col-span-5 bg-card p-6 rounded-xl border border-muted-foreground">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
            <Ban className="h-5 w-5 text-red-500 mr-2" />
            Prohibited Content & Actions
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {prohibitedContent.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-red-500 font-bold mr-2">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Platform Limitations */}
        <div className="md:col-span-7 space-y-4">
          <h3 className="text-xl font-bold flex items-center">
            <AlertOctagon className="h-5 w-5 text-purple-500 mr-2" />
            Our Dynamic & Role
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We operate exclusively as a listing platform infrastructure. Any transaction agreement remains completely independent between buyers and sellers. We:
          </p>
          <div className="bg-card p-4 rounded-xl border border-muted-foreground">
            <ul className="space-y-2 text-xs text-muted-foreground">
              {platformLimitations.map((limitation, idx) => (
                <li key={idx} className="flex items-center text-foreground/90">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2.5" />
                  {limitation}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Buyer & Seller Dual-Column Responsibilities */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-card p-6 rounded-xl border border-muted-foreground">
          <h4 className="font-bold border-b border-muted-foreground pb-2 mb-3 text-purple-400">Buyer Responsibilities</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {buyerResponsibilities.map((res, idx) => (
              <li key={idx} className="flex items-center">
                <span className="text-purple-500 mr-2">•</span>
                {res}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card p-6 rounded-xl border border-muted-foreground">
          <h4 className="font-bold border-b border-muted-foreground pb-2 mb-3 text-purple-400">Seller Responsibilities</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {sellerResponsibilities.map((res, idx) => (
              <li key={idx} className="flex items-center">
                <span className="text-purple-500 mr-2">•</span>
                {res}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Communications & Disclaimers */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 border-t border-muted-foreground pt-8">
        <div>
          <h4 className="font-bold mb-2 flex items-center text-sm uppercase tracking-wider text-muted-foreground">
            <MessageSquareOff className="h-4 w-4 mr-1.5 text-purple-500" />
            External Channels
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Communications may shift to phone calls, WhatsApp, or emails. We do not monitor, manage, or hold liability for operations taking place outside our domain environment.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-2 flex items-center text-sm uppercase tracking-wider text-muted-foreground">
            <XCircle className="h-4 w-4 mr-1.5 text-purple-500" />
            No Warranty Basis
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Services are rendered on an "as is" and "as available" basis. We explicitly discard representations or promises concerning:
          </p>
          <p className="text-[11px] text-purple-400 font-medium mt-1">
            {noWarranties.join(', ')}
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-2 flex items-center text-sm uppercase tracking-wider text-muted-foreground">
            <UserX className="h-4 w-4 mr-1.5 text-purple-500" />
            Liability Caps
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            To the furthest legal extent, we discard fault regarding device/vehicle defects, fraudulent listings, local user disputes, financial balance losses, or structural damages.
          </p>
        </div>
      </div>

      {/* Bottom Legal Blocks */}
      <div className="grid sm:grid-cols-2 gap-4 bg-card p-4 rounded-xl border border-muted-foreground mb-12 text-xs text-muted-foreground">
        <p>
          <strong className="text-foreground block mb-0.5">Suspension & Termination:</strong> 
          We reserve total authority to temporarily freeze or completely dissolve profile memberships showing indicators of agreement violations.
        </p>
        <p>
          <strong className="text-foreground block mb-0.5">Governing Scope:</strong> 
          These operations and active legal declarations are strictly anchored to, interpreted by, and enforced under the state laws of India.
        </p>
      </div>

      {/* Global Notice Footer Banner */}
      <div className="bg-card text-foreground p-6 rounded-2xl border border-muted-foreground flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <ShieldAlert className="h-6 w-6 text-purple-500 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-sm">Agreement Terms Framework</h4>
            <p className="text-xs text-muted-foreground">Subsequent adjustments to terms update systematically here. Continued interaction implies functional consensus.</p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 bg-background rounded-lg border border-muted-foreground">
          <HelpCircle className="h-3.5 w-3.5 text-purple-500" />
          <span>Governed by Indian Law</span>
        </div>
      </div>
    </section>
  );
}