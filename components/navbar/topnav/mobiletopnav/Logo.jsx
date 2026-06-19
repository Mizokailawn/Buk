"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function MobileTopNavLeft() {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  if (isHome) {
    return (
      <Link href="/" aria-label="BUK Home">
        <span className="font-bold">BUK</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back"
      className="flex items-center justify-center"
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
  );
}