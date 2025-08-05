'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';

import MenuBar from './tiptap-menu';
import { useState } from 'react';
import ImageGallery from './image-gallery';

type Props = {
  content: string;
  onChange: (content: string) => void;
};

export default function TiptapEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5],
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-3',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-3',
          },
        },
      }),
      Link,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      Image.configure({
        inline: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'min-h-[300px] border border-gray-300 rounded-md p-4 focus:outline-none prose tiptap p-4 border rounded-md focus:outline-none',
      },
    },
  });

  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);

  if (!editor) return null;

  return (
    <div className='space-y-2'>
      <MenuBar
        editor={editor}
        onImageSelect={() => setIsImageGalleryOpen(true)}
      />
      <EditorContent editor={editor} />
      <ImageGallery
        open={isImageGalleryOpen}
        onClose={() => setIsImageGalleryOpen(false)}
        onSelect={url => {
          editor?.chain().focus().setImage({ src: url }).run();
          setIsImageGalleryOpen(false);
        }}
      />
    </div>
  );
}
