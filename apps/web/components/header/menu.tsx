'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@edu/ui/components/navigation-menu';

import { PUBLIC_ROUTES } from '@/constants';
import MobileMenu from './mobile-menu';

export default function Menu() {
  return (
    <>
      <div className='hidden md:block'>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Giới hiệu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[200px] gap-4'>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href={PUBLIC_ROUTES.HERITAGE}>
                        Lịch sử và truyền thống
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href={PUBLIC_ROUTES.TEAMS}>Cơ cấu tổ chức</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href={PUBLIC_ROUTES.VISION}>
                        Tầm nhìn – Sứ mạng
                      </Link>
                    </NavigationMenuLink>

                    <NavigationMenuLink asChild>
                      <Link href={PUBLIC_ROUTES.FACILITIES}>
                        Cơ sở vật chất
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Tin tức & Sự kiện</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[200px] gap-4'>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href={PUBLIC_ROUTES.NEWS}>Tin tức</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href={PUBLIC_ROUTES.EVENTS}>Sự kiện</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href={PUBLIC_ROUTES.NOTIFICATIONS}>Thông báo</Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={PUBLIC_ROUTES.DOCUMENT}>Văn bản & Hồ sơ</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={PUBLIC_ROUTES.CONTACT}>Liên hệ</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <MobileMenu />
    </>
  );
}
