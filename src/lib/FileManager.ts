import { create, mkdir, rename, remove } from '@tauri-apps/plugin-fs';

/**
 * Cria um arquivo em qualquer local do sistema de arquivos.
 *
 * ⚠️ ATENÇÃO: Esta função só funcionará se o `scope` do `fs` em
 * `tauri.conf.json` estiver configurado como `["**"]`.
 * Use com extrema cautela.
 *
 * @param absolutePath O caminho absoluto completo onde o arquivo será criado.
 * Ex: "/home/usuario/Desktop/meu_arquivo.txt"
 * Ex: "C:\\Users\\Usuario\\Documents\\relatorio.docx"
 */
export async function createFile(absolutePath: string) {
    try {
        console.log(`Tentando criar arquivo em: ${absolutePath}`);

        // A função `create` agora aceita qualquer caminho,
        // desde que a permissão tenha sido concedida.
        await create(absolutePath);

        alert(`Arquivo criado com sucesso em: ${absolutePath}`);

    } catch (error) {
        console.error("Erro ao criar o arquivo:", error);
        alert(`Falha ao criar o arquivo. Verifique o caminho e as permissões do sistema.`);
    }
}

export async function createDir(absolutePath: string) {
    try {
        console.log(`Tentando criar pasta em: ${absolutePath}`);

        // A função `create` agora aceita qualquer caminho,
        // desde que a permissão tenha sido concedida.
        await mkdir(absolutePath);

        alert(`Pasta criada com sucesso em: ${absolutePath}`);

    } catch (error) {
        console.error("Erro ao criar a pasta:", error);
        alert(`Falha ao criar a pasta. Verifique o caminho e as permissões do sistema.`);
    }
}

export async function renameFile(oldPath: string, newPath: string) {
 console.log(`Tentando renomear o arquivo de ${oldPath} para ${newPath}`);
 try {
  await rename(oldPath, newPath);
 } catch (error) {
  console.error("Erro ao renomear o arquivo:", error);
  alert(`Falha ao renomear o arquivo. Verifique o caminho e as permissões do sistema.`);
 }
}

export async function moveFile(oldPath: string, newPath: string) {
 console.log(`Tentando mover o arquivo de ${oldPath} para ${newPath}`);
}

export async function copyFile(oldPath: string, newPath: string) {
 console.log(`Tentando copiar o arquivo de ${oldPath} para ${newPath}`);

}

export async function deleteFile(filePath: string) {
 console.log(`Tentando deletar o arquivo ${filePath}`);
 try {
  await remove(filePath);
 } catch (error) {
  console.error("Erro ao deletar o arquivo:", error);
  alert(`Falha ao deletar o arquivo. Verifique o caminho e as permissões do sistema.`);
 }
}

export async function deleteDir(dirPath: string) {
 console.log(`Tentando deletar a pasta ${dirPath}`);
 try {
  await remove(dirPath, {recursive: true});
 } catch (error) {
  console.error("Erro ao deletar a pasta:", error);
  alert(`Falha ao deletar a pasta. Verifique o caminho e as permissões do sistema.`);
 }
}

