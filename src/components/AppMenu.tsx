
import { closeProject } from "@/lib/ProjectManager";
import { getCurrent } from "@tauri-apps/plugin-window";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "./ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

interface AppMenuProps {
  onNewProjectClick: () => void;
}

export function AppMenu({ onNewProjectClick }: AppMenuProps) {
  const { setTheme } = useTheme();
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-background border-b border-gray-200/15 text-foreground h-10">

      {/* <MenuIcon className="top-0 right-0"/> */}
    <DropdownMenu>
      <DropdownMenuTrigger className="light:text-gray-600 dark:text-gray-400 px-4 py-2">Arquivo</DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem onClick={onNewProjectClick}>Novo Projeto</DropdownMenuItem>
        <DropdownMenuItem onClick={closeProject}>Fechar Projeto</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="ml-2 light:text-gray-600 dark:text-white">Tema</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => setTheme("light")}>Claro</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Escuro</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>Sistema</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={() => getCurrent().close()}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
}
