import Link from "next/link";

import TopNavMenu from "./top-nav-menu";
import { AuthButton } from "@/components/auth/auth-button";
import SearchBox from "@/components/search/search-box";
import { ModeToggle } from "@/components/theme-toggle";


const DesktopTopNav = ({ user }) => {
  return (
    <nav className="hidden md:grid fixed top-0 z-50 w-full items-center grid-cols-3 px-6 py-2 h-16 border-b bg-background/60 backdrop-blur">
      <div className="flex items-center justify-start">
        <Link href="/">
          <div className="font-bold text-2xl flex items-center gap-2">BUK</div>
        </Link>
      </div>

      {/* Search */}
      <div className="flex w-full max-w-md justify-center items-center">
        <SearchBox />
      </div>

      <div className="flex items-center justify-end gap-4">
        <AuthButton initialUser={user} />
        <ModeToggle />
        <TopNavMenu />
      </div>
    </nav>
  );
};

export default DesktopTopNav;
