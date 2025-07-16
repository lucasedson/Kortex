import { useState, useEffect } from "react";
import { RxArrowRight } from "react-icons/rx";
import { NewProjectForm } from "./NewProjectForm";


export const Sidebar = () => {
    const [showMenu, setShowMenu] = useState(true);
    const classSide = showMenu ? 'bg-slate-200 min-w-[300px] shadow-lg p-4 border-black mx-auto rounded-xl min-h-[400px]' : 'hidden';
    
    const toggleMenu = () => {
        setShowMenu(!showMenu);
      };

    useEffect(() => {
        if (showMenu) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
      }, [showMenu]);

    return <div className="relative h-[100vh] top-0 left-0 z-50">
        <button onClick={toggleMenu}>
        <RxArrowRight/>
    </button>
    <div className={classSide}>
        <NewProjectForm/>
        <button>New File</button>
        </div>
        </div>;
    };