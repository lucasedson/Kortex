// src/components/NewProjectForm.jsx
import { useState } from 'react';
import { createNewProject, openProject, actualProject } from '../lib/ProjectManager';
import { RxFile, RxPlus, RxReload } from 'react-icons/rx';

export function NewProjectForm() {
  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event : any) => {
    event.preventDefault();
    setIsLoading(true);
    
    await createNewProject(projectName);

    setIsLoading(false);
  };

  const handleOpenDialog = async () => {
    await openProject();
  };

  const viewProject = async () => {
    actualProject();
  };

  return (
    <div className="flex p-8 border-t border-gray-200 dark:border-gray-700 gap-1">
      <button onClick={viewProject}>Actual Project</button>
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