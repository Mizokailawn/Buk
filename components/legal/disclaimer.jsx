import React from 'react';
import { 
  AlertTriangle, 
  Search, 
  Handshake, 
  ShieldCheck, 
  ThumbsUp, 
  AlertOctagon 
} from 'lucide-react';

export default function DisclaimerAndGuidelines() {
  const independentVerifications = [
    "Vehicle legal ownership",
    "Comprehensive vehicle history",
    "Registration and RTO documents",
    "Active insurance status",
    "Physical vehicle condition"
  ];

  const communityDos = [
    "Provide accurate vehicle information",
    "Upload real, unedited photographs",
    "Treat other platform users respectfully",
    "Follow all applicable local laws"
  ];

  const communityDonts = [
    "Post fake or bait listings",
    "Attempt financial fraud or scams",
    "Harass or spam other users",
    "Advertise illegal or unapproved goods",
    "Misrepresent vehicle ownership status"
  ];

  return (
    <section className="mx-auto bg-background text-foreground max-w-5xl px-4 py-12">
      {/* Document Header */}
      <div className="border-b border-gray-200 pb-8 mb-8">
        <div className="flex items-center space-x-3 text-foreground mb-2">
          <AlertTriangle className="h-6 w-6 text-purple-500" />
          <span className="font-semibold uppercase tracking-wider text-sm">Platform Disclosures</span>
        </div>
        <h2 className="text-3xl font-extrabold text-foreground/80 sm:text-4xl">Disclaimer & Guidelines</h2>
        <p className="text-sm text-muted-foreground mt-2">Last Updated: June 2026</p>
      </div>

      {/* Core Platform Disclaimer Card */}
      <div className="bg-card p-6 rounded-xl border border-muted-foreground mb-12">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-background rounded-xl border border-muted-foreground text-purple-500 mt-1 flex-shrink-0">
            <AlertOctagon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">General Disclaimer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We operate strictly as an online classified listing platform infrastructure. 
              We do not verify the mechanical condition, ownership title, legality, authenticity, 
              or data accuracy of any listed vehicles on this platform.
            </p>
          </div>
        </div>
      </div>

      {/* Verification List & Transaction Note Split */}
      <div className="grid md:grid-cols-12 gap-8 mb-12 items-start">
        {/* Verification Checklist */}
        <div className="md:col-span-7 space-y-4">
          <h3 className="text-xl font-bold flex items-center">
            <Search className="h-5 w-5 text-purple-500 mr-2" />
            Mandatory Independent Verification
          </h3>
          <p className="text-sm text-muted-foreground">
            Before entering into any commitment, users are strongly advised to independently verify:
          </p>
          <div className="bg-card p-5 rounded-xl border border-muted-foreground">
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              {independentVerifications.map((item, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Transaction Ecosystem Warning */}
        <div className="md:col-span-5 bg-card p-6 rounded-xl border border-muted-foreground self-stretch flex flex-col justify-center">
          <div className="text-purple-500 mb-3">
            <Handshake className="h-6 w-6" />
          </div>
          <h4 className="font-bold text-base mb-2">Direct Peer Transactions</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All transactions are conducted completely directly between buyers and sellers. 
            We are not a party to any financial transaction or physical exchange, and we assume no 
            responsibility or legal liability for agreements made between platform users.
          </p>
        </div>
      </div>

      <hr className="border-muted-foreground/30 my-12" />

      {/* Community Guidelines Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold flex items-center mb-2">
          <ShieldCheck className="h-6 w-6 text-purple-500 mr-2" />
          Community Guidelines
        </h3>
        <p className="text-sm text-muted-foreground">
          To maintain a safe, reliable environment for finding and listing vehicles, all users must respect our ecosystem behavior policies.
        </p>
      </div>

      {/* Behavioral Grid (Dos and Donts) */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* What Users Must Do */}
        <div className="bg-card p-6 rounded-xl border border-muted-foreground">
          <h4 className="font-bold border-b border-muted-foreground pb-2 mb-4 text-purple-400 flex items-center">
            <ThumbsUp className="h-4 w-4 mr-2" />
            Required Account Conduct
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {communityDos.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-green-500 font-bold mr-2.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What Users Must Not Do */}
        <div className="bg-card p-6 rounded-xl border border-muted-foreground">
          <h4 className="font-bold border-b border-muted-foreground pb-2 mb-4 text-red-400 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Prohibited Activities
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {communityDonts.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-red-400 font-bold mr-2.5">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Enforcement Footer Notice Banner */}
      <div className="bg-card text-foreground p-5 rounded-2xl border border-muted-foreground flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Policy Enforcement Notice:</strong> Violations of these community frameworks may result in immediate account suspension, ongoing listing termination, or permanent hardware removal from the platform database ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
}