import { useEditor, EditorContent} from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit';
import React, { useState, useEffect } from 'react';
import { RxFontBold, RxFontItalic, RxStrikethrough, RxUnderline, RxCode } from 'react-icons/rx';

const TiptapEditor = () => {


    const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<h1>Hi there</h1><p>How are you??</p>',
    editorProps: {
      attributes: {
        class: 'h-[90vh] focus:outline-none text-left items-start',
      },
    }
    
  });

    const [showMenu, setShowMenu] = React.useState(true)
    const [isEditable, setIsEditable] = React.useState(true)

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable)
    }
  }, [isEditable, editor])

  return (
    <div className='min-h-full w-[100%] mx-auto shadow-lg max-w-[70vw] pt-16 pl-4 pr-4'>

        <EditorContent editor={editor}  className='prose prose-red '/>

        {editor && (
          <BubbleMenu
            editor={editor}
            className=' border border-zinc-100 rounded-lg flex divide-yellow-500 divide-x'
            shouldShow={({ editor }) => {
              const { selection } = editor.state
              const { empty } = selection
              return empty ? false : true
            }}
          >
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className='flex gap-1.5 text-xs leading-none items-center rounded-none shadow-none bg-transparent border-none p-2 hover:bg-zinc-100'
            >
              <RxFontBold className='' />
            </button>
            
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className='flex gap-1.5 text-xs leading-none items-center rounded-none shadow-none bg-transparent border-none p-2 hover:bg-zinc-100'
            >
            <RxFontItalic className='' />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className='flex gap-1.5 text-xs leading-none items-center rounded-none shadow-none bg-transparent border-none p-2 hover:bg-zinc-100'
            >
            <RxStrikethrough className='' />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className='flex gap-1.5 text-xs leading-none items-center rounded-none shadow-none bg-transparent border-none p-2 hover:bg-zinc-100'
            >
            <RxUnderline className='' />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className='flex gap-1.5 text-xs leading-none items-center rounded-none shadow-none bg-transparent border-none p-2 hover:bg-zinc-100'
            >
            <RxCode className='' />
            </button>
          </BubbleMenu>
        )}
        


        

    </div>
  );
};

export default TiptapEditor;