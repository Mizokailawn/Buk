"use client";

import Link from "next/link";
import BotNavMenu from "./botnav-menu";
import { NAV_ITEMS } from "../nav.config";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-xl">
      <div className="flex justify-around items-center h-12 py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (            
              <Link 
                key={item.href} 
                href={item.href}
                className="flex flex-col justify-center items-center flex-1"
              >
                <Icon
                  className={`transition-colors h-5 w-5 ${
                    isActive ? "text-purple-400" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`text-xs mt-1 ${
                  isActive
                    ? "text-purple-400 font-medium"
                    : "text-muted-foreground"
                }`}
                >
                  {item.label}
                </span>
              </Link>            
          );
        })}

        {/* HOME */}
        {/* <Link href="/" className="flex-1">
          <div className="nav-item">
            <div className="icon-wrapper">
              <Home className="icon-outline w-5 h-5" />
              <Home className="icon-filled w-5 h-5 fill-current" />
            </div>            
          </div>
        </Link> */}

        {/* SELL (center emphasis) */}
        {/* <Link href="/sell" className="flex-1">
          <div className="nav-item sell-item">
            <div className="icon-wrapper">
              <PlusSquare className="icon-outline w-5 h-5" />
              <PlusSquare className="icon-filled w-5 h-5 fill-current" />
            </div>            
          </div>
        </Link> */}

        {/* MENU (Sheet) */}
        {/* <Sheet>
          <SheetTrigger asChild>
            <Button className="nav-item flex-1">
              <div className="icon-wrapper">
                <Menu className="icon-outline w-5 h-5" />
                <Menu className="icon-filled w-5 h-5 fill-current" />
              </div>              
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[85%] max-w-sm p-0">
            <SheetTitle></SheetTitle>
            {/* Your Instagram-style menu */}
        {/*</SheetContent>
        </Sheet> */}
        <div className="flex flex-1 flex-col justify-center items-center">
          <BotNavMenu />
          <span className="text-xs text-muted-foreground">
            You
          </span>
        </div>
      </div>
    </div>
  );
}
