import { NodeViewWrapper } from '@tiptap/react';
import { Play } from 'lucide-react';
export const CodeEditor  = () => {
    // const { title} = node.attrs
  return (
    <NodeViewWrapper className="w-full">
    <div className="custom-code-block flex flex-col">
        <textarea className="bg-transparent  w-full" name="" id=""></textarea>
        <div className='flex justify-end'>
            <button className=' flex text-green-500'>Run <Play className="w-5 h-5" /> </button>
        </div>
    </div>
    </NodeViewWrapper>
  );
};