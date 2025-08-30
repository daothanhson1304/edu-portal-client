'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@edu/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@edu/ui/components/dropdown-menu';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from '@edu/ui/components/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@edu/ui/components/tooltip';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';

export function ActionsCell({
  editHref,
  onConfirmDelete,
  disabled,
}: {
  editHref: string;
  onConfirmDelete: () => Promise<void> | void;
  disabled?: boolean;
}) {
  const [deleting, setDeleting] = useState(false);

  return (
    <AlertDialog>
      <DropdownMenu>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='h-8 w-8'>
                  <MoreVertical className='h-4 w-4' />
                  <span className='sr-only'>Mở menu thao tác</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Thao tác</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent align='end' className='w-40'>
          <DropdownMenuItem asChild>
            <Link href={editHref} className='flex items-center gap-2'>
              <Pencil className='h-4 w-4' /> Sửa
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Dùng AlertDialogTrigger để mở modal */}
          <DropdownMenuItem asChild>
            <AlertDialogTrigger asChild>
              <button className='flex w-full items-center gap-2 text-red-600'>
                <Trash2 className='h-4 w-4' /> Xoá
              </button>
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal xác nhận */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xoá văn bản?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể hoàn tác. Tất cả tệp đính kèm liên quan sẽ
            bị xoá khỏi hệ thống.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>Huỷ</AlertDialogCancel>
          <AlertDialogAction
            className='bg-red-600 hover:bg-red-700'
            onClick={async () => {
              try {
                setDeleting(true);
                await onConfirmDelete();
              } finally {
                setDeleting(false);
              }
            }}
            disabled={disabled || deleting}
          >
            {deleting ? 'Đang xoá…' : 'Xoá'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
