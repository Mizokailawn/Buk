"use client";

import Link from "next/link";
import BotNavMenu from "./botnav-menu";
import { NAV_ITEMS } from "../nav.config";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-lg">
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
                    isActive ? "text-purple-500" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`text-xs mt-1 ${
                  isActive
                    ? "text-purple-500 font-medium"
                    : "text-muted-foreground"
                }`}
                >
                  {item.label}
                </span>
              </Link>            
          );
        })}
        
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
