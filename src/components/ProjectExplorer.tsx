import { core } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { FileTreeItem } from "./FileTreeItem";
import { listen } from "@tauri-apps/api/event";
import { actualProject } from "@/lib/ProjectManager";
import { RxFilePlus } from "react-icons/rx";
import { FolderPlusIcon, RefreshCcw } from "lucide-react";
import { createFile, createDir } from "@/lib/FileManager";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "./ui/dropdown-menu";

export interface DirEntry {
  path: string;
  name: string;
  is_dir: boolean;
  children?: DirEntry[];
}

interface ProjectExplorerProps {
  onFileOpen: (filePath: string) => void;
  projectPath: string;
  onError: () => void;
  updateStatusMessage: (message: string) => void;
}

export function ProjectExplorer({ onFileOpen }: ProjectExplorerProps) {
  const [projectTree, setProjectTree] = useState<DirEntry[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function refreshProjectTree() {
    try {
      const currentProject = await actualProject();
      if (currentProject) {
        const tree = await core.invoke("read_dir_recursive", { path: currentProject });
        setProjectTree(tree as DirEntry[]);
      } else {
        setProjectTree([]); // Limpa a árvore se não houver projeto
      }
    } catch (error) {
      console.error("Error reading project directory:", error);
    }
  }

  async function newFile() {
    try {
      const dir = await actualProject();
      console.log(dir);
      await createFile(dir + "/newFile.md");
    } catch (error) {
      console.error("Error creating file:", error);
    }
    console.log("newFile");
    refreshProjectTree();
  }

  async function newFolder() {
    try {
      const dir = await actualProject();
      console.log(dir);
      await createDir(dir + "/newFolder");
      refreshProjectTree();
    } catch (error) {
      console.error("Error creating folder:", error);
    }
    console.log("newFolder");
  }

  useEffect(() => {
    refreshProjectTree();

    const unlisten = listen("project-changed", () => {
      refreshProjectTree();
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setIsMenuOpen(true);
  };

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <div
        className="w-full h-full text-foreground p-4 border border-gray-500/25"
        onContextMenu={handleContextMenu}
      >
        <h2 className="text-lg font-bold mb-4">Project Explorer</h2>
        <div className="mb-4">
          <button
            className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={newFile}
          >
            <RxFilePlus className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={newFolder}
          >
            <FolderPlusIcon className="w-4 h-4" />
          </button>

          <button
            className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={refreshProjectTree}
          >
            <RefreshCcw className="w-4 h-4" />
          </button>

          <div className="border-b border-gray-500/25"></div>
        </div>
        <ul>
          {projectTree.map((entry) => (
            <FileTreeItem
              key={entry.path}
              entry={entry}
              level={0}
              onFileOpen={onFileOpen}
              onRefresh={refreshProjectTree}
            />
          ))}
        </ul>
      </div>
      <DropdownMenuPortal>
        <DropdownMenuContent style={{ position: 'fixed', top: menuPosition.y, left: menuPosition.x }}>
          <DropdownMenuItem onClick={newFile}>New File</DropdownMenuItem>
          <DropdownMenuItem onClick={newFolder}>New Folder</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
