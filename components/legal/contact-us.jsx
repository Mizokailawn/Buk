import React from 'react';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Clock, 
  MapPin, 
  ShieldCheck
} from 'lucide-react';
import { SiWhatsapp } from "react-icons/si";

export default function ContactUs() {
  const phoneNumber = "8729821784";
  const formattedPhone = "+91 87298 21784";
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=Hello%20BUK%20Support,%20I%20have%20a%20question...`;

  return (
    <section className="mx-auto bg-background text-foreground max-w-5xl px-4 py-12">
      {/* Document Header */}
      <div className="border-b border-gray-200 pb-8 mb-8">
        <div className="flex items-center space-x-3 text-foreground mb-2">
          <MessageCircle className="h-6 w-6 text-purple-500" />
          <span className="font-semibold uppercase tracking-wider text-sm">Get In Touch</span>
        </div>
        <h2 className="text-3xl font-extrabold text-foreground/80 sm:text-4xl">Contact Us</h2>
        <p className="text-sm text-muted-foreground mt-2">We typically reply to queries within 24 business hours.</p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid md:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Left Side: Communication Channel Cards */}
        <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
          
          {/* WhatsApp Support Card */}
          <div className="bg-card p-6 rounded-xl border border-muted-foreground flex flex-col justify-between h-48 transition-all hover:border-purple-500">
            <div>
              <div className="flex items-center space-x-2 text-emerald-500 font-bold mb-3">
                <SiWhatsapp className="h-5 w-5" />
                <h4 className="text-foreground">WhatsApp Chat</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Chat with our support desk for rapid troubleshooting or account help.
              </p>
            </div>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition duration-200"
            >
              <SiWhatsapp className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Direct Phone Call Card */}
          <div className="bg-card p-6 rounded-xl border border-muted-foreground flex flex-col justify-between h-48 transition-all hover:border-purple-500">
            <div>
              <div className="flex items-center space-x-2 text-purple-500 font-bold mb-3">
                <Phone className="h-5 w-5" />
                <h4 className="text-foreground">Voice Support</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Prefer to speak to a human? Give our central hotline a call directly during office hours.
              </p>
            </div>
            <a 
              href={`tel:+91${phoneNumber}`}
              className="mt-4 inline-flex items-center justify-center space-x-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-foreground font-semibold text-xs rounded-lg transition duration-200"
            >
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </a>
          </div>

        </div>

        {/* Right Side: Operational Metadata Info */}
        <div className="md:col-span-5 space-y-4">
          <h3 className="text-xl font-bold flex items-center">
            <Clock className="h-5 w-5 text-purple-500 mr-2" />
            Support Hours
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our specialized human support teams operate primarily on a localized schedule to resolve user inquiries cleanly.
          </p>
          
          <div className="bg-card p-4 rounded-xl border border-muted-foreground space-y-3 text-xs text-muted-foreground">
            <div className="flex justify-between items-center border-b border-muted-foreground/30 pb-2">
              <span>Monday – Saturday:</span>
              <span className="text-foreground font-medium">9:30 AM – 4:30 PM IST</span>
            </div>
            <div className="flex justify-between items-center border-b border-muted-foreground/30 pb-2">
              <span>Sundays & Public Holidays:</span>
              <span className="text-purple-400 font-semibold">Emergency Email Only</span>
            </div>
            <div className="flex items-start pt-1 text-muted-foreground">
              <MapPin className="h-4 w-4 text-purple-500 mr-2 mt-0.5 shrink-0" />
              <span>Place of Operation: Aizawl, Mizoram.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Alternative Email Channel Row */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 border-t border-muted-foreground pt-8">
        <div className="md:col-span-2">
          <h4 className="font-bold mb-1 flex items-center text-sm uppercase tracking-wider text-muted-foreground">
            <Mail className="h-4 w-4 mr-1.5 text-purple-500" />
            Official Email Support
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            For long-form privacy requests, platform abuse reporting, documentation issues, or legal escalations, please drop a message directly into our monitoring queue.
          </p>
        </div>
        <div className="flex items-center justify-start md:justify-end">
          <a 
            href="mailto:support@yourdomain.com"
            className="text-xs font-bold px-4 py-2.5 bg-card border border-muted-foreground hover:border-purple-500 rounded-xl transition duration-200 text-foreground"
          >
            support@lalda.in
          </a>
        </div>
      </div>

      {/* Security Safety Guardrail Banner */}
      <div className="bg-card text-foreground p-5 rounded-2xl border border-muted-foreground flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="h-6 w-6 text-purple-500 flex-shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Security Warning:</strong> BUK administrative agents will never request your dashboard account login passwords, transaction PINs, or financial credit credentials over phone calls or WhatsApp chats. Protect your data carefully.
          </p>
        </div>
      </div>
    </section>
  );
}