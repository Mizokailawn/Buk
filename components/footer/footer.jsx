import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Brand */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">BUK</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Buy and sell used vehicles across Mizoram.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/about-us" className="hover:underline">
            About
          </Link>

          <Link href="/legal/privacy-policy" className="hover:underline">
            Privacy
          </Link>

          <Link href="/legal/terms-and-conditions" className="hover:underline">
            Terms
          </Link>

          <Link href="/contact-us" className="hover:underline">
            Contact
          </Link>

          <Link href="/legal/disclaimer" className="hover:underline">
            Disclaimer
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t pt-4 text-xs text-muted-foreground">
          © 2026 BUK. All rights reserved.
        </div>
      </div>
    </footer>
  );
}