import { Button } from '@edu/ui/components/button';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Link as LinkIcon,
  Link2Off,
  Underline,
  ImageUp,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from 'lucide-react';

export default function MenuBar({
  editor,
  onImageSelect,
}: {
  editor: any;
  onImageSelect: () => void;
}) {
  if (!editor) return null;

  const headingLevels = [1, 2, 3, 4, 5];

  const headingControls = headingLevels.map(level => ({
    icon: [Heading1, Heading2, Heading3, Heading4, Heading5][level - 1],
    isActive: () => editor.isActive('heading', { level }),
    command: () => editor.chain().focus().toggleHeading({ level }).run(),
  }));

  const controls = [
    {
      icon: Bold,
      isActive: () => editor.isActive('bold'),
      command: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: Italic,
      isActive: () => editor.isActive('italic'),
      command: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: Strikethrough,
      isActive: () => editor.isActive('strike'),
      command: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      icon: Underline,
      isActive: () => editor.isActive('underline'),
      command: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      icon: List,
      isActive: () => editor.isActive('bulletList'),
      command: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: ListOrdered,
      isActive: () => editor.isActive('orderedList'),
      command: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      icon: LinkIcon,
      isActive: () => false,
      command: () => {
        const url = prompt('Enter URL');
        if (url) editor.chain().focus().setLink({ href: url }).run();
      },
    },
    {
      icon: Link2Off,
      isActive: () => false,
      command: () => editor.chain().focus().unsetLink().run(),
    },
    {
      icon: AlignLeft,
      isActive: () => editor.isActive({ textAlign: 'left' }),
      command: () => editor.chain().focus().setTextAlign('left').run(),
    },
    {
      icon: AlignCenter,
      isActive: () => editor.isActive({ textAlign: 'center' }),
      command: () => editor.chain().focus().setTextAlign('center').run(),
    },
    {
      icon: AlignRight,
      isActive: () => editor.isActive({ textAlign: 'right' }),
      command: () => editor.chain().focus().setTextAlign('right').run(),
    },
    {
      icon: AlignJustify,
      isActive: () => editor.isActive({ textAlign: 'justify' }),
      command: () => editor.chain().focus().setTextAlign('justify').run(),
    },
    {
      icon: Highlighter,
      isActive: () => editor.isActive('highlight'),
      command: () => editor.chain().focus().toggleHighlight().run(),
    },
  ];

  return (
    <div className='flex flex-wrap gap-2 mb-2'>
      {/* Heading controls */}
      {headingControls.map(({ icon: Icon, isActive, command }, idx) => (
        <Button
          key={`heading-${idx}`}
          variant={isActive() ? 'default' : 'outline'}
          size='sm'
          onClick={command}
        >
          {Icon && <Icon className='w-4 h-4' />}
        </Button>
      ))}

      {/* Formatting controls */}
      {controls.map(({ icon: Icon, isActive, command }, idx) => (
        <Button
          key={`control-${idx}`}
          variant={isActive() ? 'default' : 'outline'}
          size='sm'
          onClick={command}
        >
          <Icon className='w-4 h-4' />
        </Button>
      ))}

      {/* Upload Image */}
      <Button variant='outline' size='sm' onClick={onImageSelect}>
        <ImageUp className='w-4 h-4' />
      </Button>
    </div>
  );
}
