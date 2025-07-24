import { useState, useEffect, useCallback } from "react";
import { readTextFile} from "@tauri-apps/plugin-fs";
import "./App.css";
import { HomePage } from "./components/HomePage";
import { Sidebar } from "./components/Sidebar";
import { StatusBar } from "./components/StatusBar";
import { actualProject } from "./lib/ProjectManager";
import TiptapEditor from "./components/Editor"; // Assuming this is your editor component
import { AppMenu } from "./components/AppMenu";
import { NewProjectForm } from "./components/NewProjectForm";


function App() {
  const [projectPath, setProjectPath] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("Nenhum projeto aberto");
  const [statusMessage, setStatusMessage] = useState<string | undefined>(undefined);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [_currentFilePath, setCurrentFilePath] = useState<string | null>(null);
  const [currentFileContent, setCurrentFileContent] = useState<string>("");

  useEffect(() => {

    const getProject = async () => {
      const path : any = await actualProject();
      if (path) {
        setProjectPath(path);
        const name = path.split(/[\\/]/).pop(); // Extract project name from path
        setProjectName(name || "Projeto sem nome");
      }
    };
    getProject();
  }, []);

  const handleProjectChange = (newProjectPath: string | null) => {
    setProjectPath(newProjectPath);
    setShowNewProjectForm(false); // Esconde o formulário ao criar/abrir projeto
    if (newProjectPath) {
      const name = newProjectPath.split(/[\\/]/).pop();
      setProjectName(name || "Projeto sem nome");
    } else {
      setProjectName("Nenhum projeto aberto");
    }
  };

  const handleProjectExplorerError = () => {
    setProjectPath(null);
    setProjectName("Nenhum projeto aberto");
    updateStatusMessage("Erro ao carregar projeto. Retornando à página inicial.");
  };

  const updateStatusMessage = useCallback((message: string) => {
    setStatusMessage(message);
    const timer = setTimeout(() => {
      setStatusMessage(undefined);
    }, 3000); // Clear message after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleNewProjectClick = () => {
    setShowNewProjectForm(true);
    setProjectPath(null); // Limpa o projeto atual para exibir o formulário
  };

  const handleFileOpen = async (filePath: string) => {
    try {
      const content = await readTextFile(filePath); // Assuming files are within user's home directory for simplicity, adjust as needed
      setCurrentFilePath(filePath);
      setCurrentFileContent(content);
    } catch (error) {
      console.error("Failed to read file:", error);
      setCurrentFileContent(`Error: Could not read file ${filePath}`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white text-zinc-900 dark:bg-gray-900 dark:text-zinc-50">

      <AppMenu onNewProjectClick={handleNewProjectClick} />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar
          projectPath={projectPath}
          onProjectExplorerError={handleProjectExplorerError}
          updateStatusMessage={updateStatusMessage}
          onFileOpen={handleFileOpen}
        />
        <main className="flex-grow p-4 overflow-y-auto">
          {showNewProjectForm ? (
            <NewProjectForm onProjectCreated={handleProjectChange} />
          ) : projectPath ? (
            <TiptapEditor fileContent={currentFileContent} />
          ) : (
            <HomePage onProjectCreated={handleProjectChange} />
          )}
        </main>
      </div>
      <StatusBar projectName={projectName} statusMessage={statusMessage} />
    </div>
  );
}

export default App;


