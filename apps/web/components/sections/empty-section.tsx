import Link from 'next/link';
import { Calendar, Megaphone, Bell } from 'lucide-react';
import { Button } from '@edu/ui/components/button';
import { cn } from '@edu/ui/lib/utils';

type Variant = 'news' | 'events' | 'notifications';

type Action =
  | { label: string; href: string; variant?: 'default' | 'outline' }
  | { label: string; onClick: () => void; variant?: 'default' | 'outline' };

type EmptySectionProps = {
  variant: Variant;
  className?: string;
  title?: string;
  description?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
};

const defaultsByVariant: Record<
  Variant,
  { title: string; description: string; Icon: any; cta: string }
> = {
  news: {
    title: 'Chưa có tin tức',
    description:
      'Nhà trường sẽ cập nhật tin mới trong thời gian sớm nhất. Bạn có thể xem trang Giới thiệu hoặc Liên hệ để biết thêm thông tin.',
    Icon: Megaphone,
    cta: 'Xem giới thiệu',
  },
  events: {
    title: 'Chưa có sự kiện',
    description:
      'Hiện chưa có hoạt động/sự kiện được công bố. Vui lòng quay lại sau hoặc theo dõi thông báo của nhà trường.',
    Icon: Calendar,
    cta: 'Xem lịch chung',
  },
  notifications: {
    title: 'Chưa có thông báo',
    description:
      'Hiện chưa có thông báo mới. Khi có thông báo quan trọng, hệ thống sẽ hiển thị tại đây.',
    Icon: Bell,
    cta: 'Xem tất cả thông báo',
  },
};

function renderAction(a?: Action) {
  if (!a) return null;
  const className =
    a.variant === 'outline'
      ? 'border-gray-300'
      : 'bg-primary text-primary-foreground hover:bg-primary/90';
  // Link action
  if ('href' in a) {
    return (
      <Link href={a.href}>
        <Button className={className}>{a.label}</Button>
      </Link>
    );
  }
  // onClick action
  return (
    <Button className={className} onClick={a.onClick}>
      {a.label}
    </Button>
  );
}

export default function EmptySection({
  variant,
  className,
  title,
  description,
  primaryAction,
  secondaryAction,
}: EmptySectionProps) {
  const def = defaultsByVariant[variant];

  return (
    <div
      className={cn(
        'col-span-full min-h-[200px] rounded-xl bg-gray-50/80',
        'p-8 flex flex-col items-center justify-center text-center',
        className
      )}
      role='status'
      aria-live='polite'
    >
      <p className='text-lg font-semibold text-gray-800'>
        {title ?? def.title}
      </p>
      <p className='text-sm text-muted-foreground mt-1 max-w-xl'>
        {description ?? def.description}
      </p>

      {(primaryAction || secondaryAction) && (
        <div className='mt-4 flex items-center gap-3'>
          {renderAction(primaryAction)}
          {renderAction(secondaryAction)}
        </div>
      )}
    </div>
  );
}
