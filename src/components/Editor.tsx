import { useEditor, EditorContent} from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit';
import React, { useState, useEffect } from 'react';
import { RxFontBold, RxFontItalic, RxStrikethrough, RxUnderline, RxCode, RxTable, RxLink1, RxHeading  } from 'react-icons/rx';
import { PiSigmaFill } from "react-icons/pi";
import { Placeholder } from '@tiptap/extensions'
import {Markdown} from 'tiptap-markdown';

interface EditorProps {
  fileContent: string;
}

const TiptapEditor = ({ fileContent }: EditorProps) => {


    const editor = useEditor({
    extensions: [
        Placeholder.configure({
            placeholder: 'Use `/` to add a command',

            
        }),
        StarterKit,
        Markdown.configure({
          html: true, // Allows HTML within Markdown
        }),
    ],

    editorProps: {
      attributes: {
        class: 'min-h-[90vh] focus:outline-none text-left items-start',
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

  useEffect(() => {
    if (editor && fileContent !== editor.getHTML()) {
      editor.commands.setContent(fileContent);
    }
  }, [fileContent, editor]);

  return (
    <div className='min-h-full w-[100%] mx-auto shadow-lg max-w-[70vw] pt-16 pl-4 pr-4 prose prose-red prose-h1:text-left'>
        
    
    
        <EditorContent editor={editor}  
        className=''
        
        
        
        />

        {editor && (
          
          <FloatingMenu
            editor={editor}
            className=' border bg-slate-50 border-zinc-100 rounded-lg gap-1 flex divide-x divide-black'
            shouldShow={({ state }) => {
              const {$from} = state.selection
              const currentLine = $from.nodeBefore?.textContent
              return currentLine?.startsWith('/') ? true : false
            }}
          >
            <div className='flex flex-col gap-1.5 text-xs leading-none items-center rounded-none shadow-none bg-gray-500/10 border-none p-2'>
              {/* <h2>Lista de comandos</h2> */}

              <div className='flex gap-3 text-xs leading-none items-center rounded-none shadow-none bg-transparent border-none p-2'>
               <button className='shadow text-xl' onClick={() =>
                {

                  editor.commands.clearContent()

                  editor.chain().focus().insertContent('# ').run()
                }
                }>
                <RxHeading />
               </button>

                <button className='shadow text-xl'>
                  <RxCode />
                </button>

                <button className='shadow text-xl'>
                  <RxTable />
                </button>
              </div>

            </div>
          </FloatingMenu>
        )}

        {editor && (
          <BubbleMenu
            editor={editor}
            className=' border bg-slate-50 border-zinc-100 rounded-lg gap-1 flex divide-x divide-black'
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
              className='flex gap-1.5 text-sm leading-none items-center rounded-none shadow-none bg-transparent border-none p-2 hover:bg-zinc-100'
            >
            <RxCode className='' />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleLink().run()}
              className='flex gap-1.5 text-sm leading-none items-center rounded-none shadow-none bg-transparent border-none p-2 hover:bg-zinc-100'
            >
            <RxLink1 className='' />
            </button>

            <button className='flex gap-1.5 text-sm leading-none items-center rounded-none shadow-none bg-transparent border-none p-2 hover:bg-zinc-100'
              onClick={() => editor.chain().focus().insertContent('<h1 />').run()}
            >
              <PiSigmaFill />
            </button>


          </BubbleMenu>
        )}
        


        

    </div>
  );
};

export default TiptapEditor;