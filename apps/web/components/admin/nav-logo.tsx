import * as React from 'react';
import { GalleryVerticalEnd } from 'lucide-react';
import Link from 'next/link';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@edu/ui/components/sidebar';
import { PUBLIC_ROUTES } from '@/constants';

export function NavLogo() {
  return (
    <Link href={PUBLIC_ROUTES.HOME} className='cursor-pointer'>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size='lg'
            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer'
          >
            <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
              <GalleryVerticalEnd className='size-4' />
            </div>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-medium'>Dong Than Education</span>
              <span className='truncate text-xs'>Dong Than Education Inc.</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </Link>
  );
}
