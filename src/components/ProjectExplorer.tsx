import { core } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { FileTreeItem } from "./FileTreeItem";
import { listen } from "@tauri-apps/api/event";
import { actualProject } from "@/lib/ProjectManager";

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
      <ul>
        {projectTree.map((entry) => (
          <FileTreeItem key={entry.path} entry={entry} level={0} onFileOpen={onFileOpen} />
        ))}
      </ul>
    </div>
  );
}
