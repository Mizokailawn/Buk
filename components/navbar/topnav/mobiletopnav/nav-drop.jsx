"use client"

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { MORE_ITEMS } from '../../nav.config';

const NavDropDown = () => {
  return (
    <div>
        <DropdownMenu>
        {/* Trigger */}
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>

        {/* Content */}
        <DropdownMenuContent align="end" className="w-48">
          {MORE_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <DropdownMenuItem key={item.href} asChild>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 w-full"
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default NavDropDown