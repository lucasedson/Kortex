import { appDataDir, join } from '@tauri-apps/api/path';
import { mkdir } from '@tauri-apps/plugin-fs';
import { save, open } from '@tauri-apps/plugin-dialog';
import { load } from '@tauri-apps/plugin-store';
import { emit } from '@tauri-apps/api/event';

export interface TauriFileEntry {
  name: string;
  isDir: boolean;
}



export async function actualProject() {
  const store = await load('actualProject.json', { autoSave: false });
  const projectPath = await store.get('actualProject');
  return projectPath as string | null;
}

export async function closeProject() {
  const store = await load('actualProject.json', { autoSave: false });
  await store.set('actualProject', null);
  await store.save();
  await emit('project-changed');
  console.log('Project closed.');
}

export async function createNewProject(projectName: string): Promise<string | null> {
  if (!projectName) {
    console.error('Project name is required');
    return null;
  }

  await closeProject();

  const defaultPath = await appDataDir();
  if (!defaultPath) {
    console.error('Failed to get app data directory');
    return null;
  }

  try {
    const filePath = await save({
      title: 'Novo Projeto',
      defaultPath: await join(defaultPath, projectName),
    });

    if (typeof filePath === 'string') {
      const store = await load('actualProject.json', { autoSave: false });
      await mkdir(filePath, { recursive: true });
      await store.set('actualProject', filePath);
      await store.save();
      await emit('project-changed');
      console.log('Project created at:', filePath);
      return filePath;
    }
    return null;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
}

export async function openProject(): Promise<string | null> {
  await closeProject();

  try {
    const selectedPath = await open({
      title: 'Abrir Projeto',
      directory: true,
    });

    if (typeof selectedPath === 'string') {
      const store = await load('actualProject.json', { autoSave: false });
      await store.set('actualProject', selectedPath);
      await store.save();
      await emit('project-changed');
      console.log('Project path:', selectedPath);
      return selectedPath;
    }
    return null;
  } catch (error) {
    console.error('Error opening project:', error);
    return null;
  }
}
