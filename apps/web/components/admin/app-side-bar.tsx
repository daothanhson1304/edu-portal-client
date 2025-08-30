'use client';

import {
  AudioWaveform,
  BookOpen,
  Command,
  FileText,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
} from 'lucide-react';

import { NavMain } from '@/components/admin/nav-main';
import { NavUser } from '@/components/admin/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@edu/ui/components/sidebar';
import { ADMIN_ROUTES } from '@/constants';
import { NavLogo } from './nav-logo';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },

  navMain: [
    {
      title: 'Bài viết',
      url: ADMIN_ROUTES.POSTS,
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: 'Tạo mới',
          url: ADMIN_ROUTES.HOME,
        },
        {
          title: 'Tin tức',
          url: ADMIN_ROUTES.NEWS,
        },
        {
          title: 'Sự kiện',
          url: ADMIN_ROUTES.EVENTS,
        },
        {
          title: 'Thông báo',
          url: ADMIN_ROUTES.NOTICES,
        },
      ],
    },
    {
      title: 'Văn bản',
      url: ADMIN_ROUTES.DOCUMENTS,
      icon: FileText,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <NavLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
