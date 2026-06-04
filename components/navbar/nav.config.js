import { 
    Shield, HelpCircle, FileText, Home, 
    Smartphone, Compass, Search, PlusCircle
 } from "lucide-react";

export const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Explore", href: "/listings", icon: Compass },
  { label: "Sell", href: "/sell", icon: PlusCircle },
  { label: "Search", href: "/listings?search=1", icon: Search }
];

export const MORE_ITEMS = [
  { label: "FAQs", href: "/faq", icon: HelpCircle },
  { label: "Terms", href: "/terms", icon: FileText },
  { label: "Privacy", href: "/privacy", icon: Shield },
  { label: "Contact Us", href: "/contact", icon: Smartphone }
];