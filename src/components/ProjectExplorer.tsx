import { core } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { FileTreeItem } from "./FileTreeItem";
import { listen } from "@tauri-apps/api/event";
import { actualProject } from "@/lib/ProjectManager";
import { RxFilePlus } from "react-icons/rx";
import { FolderPlusIcon } from "lucide-react";
import { createFile, createDir, deleteFile } from "@/lib/FileManager";

export interface DirEntry {
  path: string;
  name: string;
  is_dir: boolean;
  children?: DirEntry[];
}

interface ProjectExplorerProps {
  onFileOpen: (filePath: string) => void;
}

export function ProjectExplorer({ onFileOpen }: ProjectExplorerProps) {
  const [projectTree, setProjectTree] = useState<DirEntry[]>([]);

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

  async function deleteSelectedFile(filePath: string) {
    try {
      await deleteFile(filePath);
      refreshProjectTree();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
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
      unlisten.then(f => f());
    };
  }, []);

  return (
    <div className="w-full h-full text-foreground p-4 border border-gray-500/25">
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

      <div className="border-b border-gray-500/25"></div>


      </div>
      <ul>
        {projectTree.map((entry) => (
          <FileTreeItem key={entry.path} entry={entry} level={0} onFileOpen={onFileOpen} />
        ))}
      </ul>
    </div>
  );
}
