import { useState } from 'react';
import { createNewProject, openProject } from '../lib/ProjectManager';
import { RxFile, RxPlus, RxReload } from 'react-icons/rx';

interface NewProjectFormProps {
  onProjectCreated: (projectPath: string | null) => void;
}

export function NewProjectForm({ onProjectCreated }: NewProjectFormProps) {
  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event : any) => {
    event.preventDefault();
    setIsLoading(true);
    
    const path = await createNewProject(projectName);
    onProjectCreated(path);

    setIsLoading(false);
  };

  const handleOpenDialog = async () => {
    const path = await openProject();
    onProjectCreated(path);
  };

  return (
    <div className="flex p-8 border-t border-gray-200 dark:border-gray-700 gap-1">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="New Project Name"
          className="flex-grow p-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-violet-600 text-white font-semibold rounded hover:bg-violet-700 disabled:bg-gray-400"
        >
          {isLoading ? <RxReload className="animate-spin"/> : <RxPlus />}
        </button>

      </form>
        
        <button className="px-4 py-2 bg-violet-600 text-white font-semibold rounded hover:bg-violet-700" onClick={handleOpenDialog}>
          <RxFile/>
        </button>
    </div>
  );
}