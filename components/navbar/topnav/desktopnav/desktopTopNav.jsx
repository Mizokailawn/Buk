import Link from "next/link";

import TopNavMenu from "./top-nav-menu";
import { AuthButton } from "@/components/auth/auth-button";
import SearchBox from "@/components/search/search-box";
import { ModeToggle } from "@/components/shared/theme-toggle";
import AuthButtonWrapper from "@/components/auth/auth-button-wrapper";
import { Suspense } from "react";
import Image from "next/image";

const DesktopTopNav = () => {

  const navItems = [
    {label: "Home", href: "/"},
    {label: "Explore", href: "/listings"},
    {label: "Sell", href: "/sell"},
    {label: "Contact", href: "/contact-us"}
  ]
  return (
    <nav className="hidden md:grid fixed top-0 z-50 w-full items-center grid-cols-4 px-6 py-2 h-16 border-b bg-background/60 backdrop-blur">
      <div className="flex items-center justify-start">
        <Link href="/" className="flex gap-2 items-center">
          <Image src="/icon-512.png" alt="logo" width={30} height={30} />
          <div className="font-bold text-2xl flex items-center gap-2">BUK</div>
        </Link>
      </div>

      {/* Search */}
      <div className="flex w-full max-w-md justify-center items-center">
        <SearchBox />
      </div>

      {/* Menu Items */}
      <div className="flex items-center justify-end gap-10">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-sm font-medium hover:text-purple-500 hover:scale-[1.2] text-muted-foreground"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-end gap-4">
        <Suspense>
          <AuthButtonWrapper />
        </Suspense>
        <ModeToggle />
        <TopNavMenu />
      </div>
    </nav>
  );
};

export default DesktopTopNav;
