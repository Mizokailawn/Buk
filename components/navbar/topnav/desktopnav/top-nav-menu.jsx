import React from "react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MENU_ITEMS } from "../../nav.config";
import Link from "next/link";
import { UserCircle } from "lucide-react";


const TopNavMenu = () => {  
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <UserCircle className="h-7 w-7 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            {MENU_ITEMS.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href}>
                  {item.icon && <item.icon className="mr-2 size-4" />}
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TopNavMenu;
