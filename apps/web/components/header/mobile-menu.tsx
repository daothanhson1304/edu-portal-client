import { PUBLIC_ROUTES } from '@/constants';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@edu/ui/components/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@edu/ui/components/collapsible';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@edu/ui/components/button';
import { Menu as MenuIcon } from 'lucide-react';

function MobileMenu() {
  const router = useRouter();

  // Helper: đóng sheet sau khi click link
  const LinkItem = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Button
      variant='ghost'
      className='w-full justify-start text-base'
      onClick={() => router.push(href)}
    >
      {children}
    </Button>
  );

  return (
    <div className='md:hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <button
            aria-label='Mở menu'
            className='p-2 rounded-md hover:bg-muted focus:outline-none focus:ring'
          >
            <MenuIcon size={24} />
          </button>
        </SheetTrigger>

        <SheetContent side='left' className='w-80 p-0'>
          <SheetHeader className='p-4'>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <nav className='px-2 pb-4 space-y-1'>
            {/* Nhóm: Giới thiệu */}
            <Collapsible className='border-b'>
              <CollapsibleTrigger className='w-full flex items-center justify-between px-2 py-3 text-base font-medium'>
                <span>Giới thiệu</span>
                <ChevronRight className='h-4 w-4 transition-transform data-[state=open]:rotate-90' />
              </CollapsibleTrigger>
              <CollapsibleContent className='pb-2 space-y-1'>
                <LinkItem href={PUBLIC_ROUTES.HERITAGE}>
                  Lịch sử và truyền thống
                </LinkItem>
                <LinkItem href={PUBLIC_ROUTES.TEAMS}>Cơ cấu tổ chức</LinkItem>
                <LinkItem href={PUBLIC_ROUTES.VISION}>
                  Tầm nhìn – Sứ mạng
                </LinkItem>
                <LinkItem href={PUBLIC_ROUTES.FACILITIES}>
                  Cơ sở vật chất
                </LinkItem>
              </CollapsibleContent>
            </Collapsible>

            {/* Nhóm: Tin tức & Sự kiện */}
            <Collapsible className='border-b'>
              <CollapsibleTrigger className='w-full flex items-center justify-between px-2 py-3 text-base font-medium'>
                <span>Tin tức & Sự kiện</span>
                <ChevronRight className='h-4 w-4 transition-transform data-[state=open]:rotate-90' />
              </CollapsibleTrigger>
              <CollapsibleContent className='pb-2 space-y-1'>
                <LinkItem href={PUBLIC_ROUTES.NEWS}>Tin tức</LinkItem>
                <LinkItem href={PUBLIC_ROUTES.EVENTS}>Sự kiện</LinkItem>
                <LinkItem href={PUBLIC_ROUTES.NOTIFICATIONS}>
                  Thông báo
                </LinkItem>
              </CollapsibleContent>
            </Collapsible>

            {/* Link đơn */}
            <div className='border-b'>
              <LinkItem href={PUBLIC_ROUTES.DOCUMENT}>Văn bản & Hồ sơ</LinkItem>
            </div>
            <div>
              <LinkItem href={PUBLIC_ROUTES.CONTACT}>Liên hệ</LinkItem>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileMenu;
