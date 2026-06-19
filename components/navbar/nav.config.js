import { MessageCircle } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Info } from "lucide-react";
import { UserCircle } from "lucide-react";
import { 
    Shield, HelpCircle, FileText, Home, 
    Compass, PlusCircle
 } from "lucide-react";

export const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Explore", href: "/listings", icon: Compass },
  { label: "Sell", href: "/sell", icon: PlusCircle },
];

export const MORE_ITEMS = [
  { label: "FAQs", href: "/faq", icon: HelpCircle },
  { label: "Terms and Conditions", href: "/legal/terms-and-conditions", icon: FileText },
  { label: "Privacy policy", href: "/legal/privacy-policy", icon: Shield },
  
];

export const BOTTOM_SHEET_ITEMS = [
  {label: "Profile", href: "/profile", icon: UserCircle},
  {label: "Contact Us", href: "/contact-us", icon: MessageCircle},
  {label: "About Us", href: "/legal/about-us", icon: Info},
  {label: "Disclaimer", href: "/legal/disclaimer", icon: AlertTriangle}
]