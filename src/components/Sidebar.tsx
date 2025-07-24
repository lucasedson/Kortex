import { useState } from "react";
import { File, Play, User, Settings } from "lucide-react";
import { ProjectExplorer } from "./ProjectExplorer";

interface SidebarProps {
  projectPath: any;
  onProjectExplorerError: () => void;
  updateStatusMessage: (message: string) => void;
  onFileOpen: (filePath: string) => void;
}

export const Sidebar = ({ projectPath, onProjectExplorerError, updateStatusMessage, onFileOpen }: SidebarProps) => {
  const [activeView, setActiveView] = useState("");

  const toggleView = (view: string) => {
    setActiveView(activeView === view ? "" : view);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center w-16 py-4 bg-gray-200 dark:bg-gray-800">
        <button onClick={() => toggleView("explorer")} className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700">
          <File className="w-6 h-6" />
        </button>
        <button onClick={() => toggleView("run")} className="p-2 mt-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700">
          <Play className="w-6 h-6" />
        </button>
        <button onClick={() => toggleView("accounts")} className="p-2 mt-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700">
          <User className="w-6 h-6" />
        </button>
        <div className="flex-grow" />
        <button onClick={() => toggleView("manage")} className="p-2 mt-auto rounded-md hover:bg-gray-300 dark:hover:bg-gray-700">
          <Settings className="w-6 h-6" />
        </button>
      </div>
      {activeView && (
        <div className="w-64 p-4 bg-gray-200 dark:bg-gray-800">
          {activeView === "explorer" && projectPath && <ProjectExplorer projectPath={projectPath} onError={onProjectExplorerError} updateStatusMessage={updateStatusMessage} onFileOpen={onFileOpen} />}
          {activeView === "explorer" && !projectPath && <div>Nenhum projeto aberto.</div>}
          {activeView === "run" && <div>Run Functions</div>}
          {activeView === "accounts" && <div>Account Details</div>}
          {activeView === "manage" && <div>Management Options</div>}
        </div>
      )}
    </div>
  );
};