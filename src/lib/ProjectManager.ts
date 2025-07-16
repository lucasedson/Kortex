// src/lib/projectManager.js
import { appDataDir, join } from '@tauri-apps/api/path';
import { mkdir } from '@tauri-apps/plugin-fs';
import {save, open} from '@tauri-apps/plugin-dialog';
import {load} from '@tauri-apps/plugin-store';



/**
 * Cria um novo projeto na pasta de dados do aplicativo.
 * @param {string} projectName O nome do novo projeto.
 * @returns {Promise<string|null>} O caminho completo para o projeto criado ou null em caso de falha.
 * 
 */



// const store = await load('store.json', { autoSave: true });


// Set a value.

// Get a value.
const store = await load('actualProject.json', { autoSave: false });
export async function actualProject() {
  
  const actualProject = await store.get('actualProject');
  console.log('Actual Project:', actualProject);
  

}

export async function createNewProject(projectName: string) {
  if (!projectName) {
    console.error('Project name is required');
    return null;
  }
  let defaultPath = await appDataDir();
  
  if (!defaultPath) {
    console.error('Failed to get app data directory');
    return null;
  }
  
  save({

    title: 'Novo Projeto',
  
    defaultPath: await join(defaultPath, projectName),
    filters: [
      { name: 'Kortex Project', extensions: ['kortex'] }
    ]
  })
    .then(async (path: any) => {
      if (path) {
        await mkdir(path);
        await store.set('actualProject', path);
        store.save();
        console.log('Project created at:', path);
      }
    })
    .catch((error: any) => {
      console.error('Error creating project:', error);
    });
  
}

export async function openProject() {
  open({
    title: 'Abrir Projeto',
    directory: true
    
  })
    .then(async (path: any) => {
      if (path) {
        await store.set('actualProject', path);
        store.save();
        console.log('Project path:', path);
      }
    })
    .catch((error: any) => {
      console.error('Error opening project:', error);
    });
}