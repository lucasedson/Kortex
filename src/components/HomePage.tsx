import { NewProjectForm } from "./NewProjectForm";

interface HomePageProps {
  onProjectCreated: (projectPath: string | null) => void;
}

export const HomePage = ({ onProjectCreated }: HomePageProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Kortex</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Comece criando um novo projeto.</p>
        <NewProjectForm onProjectCreated={onProjectCreated} />
      </div>
    </div>
  );
};