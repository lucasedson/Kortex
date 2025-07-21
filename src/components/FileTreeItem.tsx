import { FileText, Folder } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DirEntry } from "./ProjectExplorer";
import { createFile, createDir, deleteFile, deleteDir, renameFile } from "@/lib/FileManager";
import { useState } from "react";

interface FileTreeItemProps {
  entry: DirEntry;
  level: number;
  onFileOpen: (filePath: string) => void;
  onRefresh: () => void;
}

export const FileTreeItem = ({ entry, level, onFileOpen, onRefresh }: FileTreeItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(entry.name);
  const indentClass = `pl-${level * 4}`;

  const handleCreateFile = async () => {
    try {
      const basePath = entry.is_dir
        ? entry.path
        : entry.path.substring(0, entry.path.lastIndexOf("/"));
      const newFilePath = `${basePath}/newFile.txt`;
      await createFile(newFilePath);
      onRefresh();
    } catch (error) {
      console.error("Error creating file:", error);
    }
  };

  const handleCreateFolder = async () => {
    const basePath = entry.is_dir
      ? entry.path
      : entry.path.substring(0, entry.path.lastIndexOf("/"));
    const newFolderPath = `${basePath}/newFolder`;
    await createDir(newFolderPath);
    onRefresh();
  };

  const handleDelete = async () => {
    if (entry.is_dir) {
      await deleteDir(entry.path);
    } else {
      await deleteFile(entry.path);
    }
    onRefresh();
  };

  const handleRename = async () => {
    if (newName && newName !== entry.name) {
      const newPath = entry.path.replace(entry.name, newName);
      await renameFile(entry.path, newPath);
      onRefresh();
    }
    setIsEditing(false);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    if (open === false) {
      setIsMenuOpen(false);
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRename();
    }
  };

  const menu = (
    <DropdownMenuContent>
      <DropdownMenuItem onClick={handleCreateFile}>New File</DropdownMenuItem>
      <DropdownMenuItem onClick={handleCreateFolder}>New Folder</DropdownMenuItem>
      <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setIsEditing(true)}>Rename</DropdownMenuItem>
    </DropdownMenuContent>
  );

  if (entry.is_dir) {
    return (
      <DropdownMenu open={isMenuOpen} onOpenChange={handleOpenChange}>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={entry.path}>
            <DropdownMenuTrigger asChild>
              <AccordionTrigger
                onContextMenu={handleContextMenu}
                onDoubleClick={handleDoubleClick}
                className={cn(
                  "flex items-center py-1 hover:bg-accent/50 text-xs",
                  indentClass
                )}
              >
                <div className="flex items-center">
                  <Folder size={16} className="mr-1" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={newName}
                      onChange={handleNameChange}
                      onKeyDown={handleKeyDown}
                      onBlur={handleRename}
                      autoFocus
                      className="bg-transparent border-none text-foreground text-xs w-full"
                    />
                  ) : (
                    <span className="text-foreground text-xs">{entry.name}</span>
                  )}
                </div>
              </AccordionTrigger>
            </DropdownMenuTrigger>
            {menu}
            <AccordionContent className="text-xs">
              {entry.children &&
                entry.children.map((child) => (
                  <FileTreeItem
                    key={child.path}
                    entry={child}
                    level={level + 1}
                    onFileOpen={onFileOpen}
                    onRefresh={onRefresh}
                  />
                ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DropdownMenu>
    );
  } else {
    return (
      <DropdownMenu open={isMenuOpen} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <div
            onContextMenu={handleContextMenu}
            onDoubleClick={handleDoubleClick}
            className={cn(
              "flex items-center py-1 cursor-pointer hover:bg-accent/50 text-xs",
              indentClass
            )}
            onClick={() => onFileOpen(entry.path)}
          >
            <FileText size={16} className="mr-1 text-foreground text-xs" />
            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={handleNameChange}
                onKeyDown={handleKeyDown}
                onBlur={handleRename}
                autoFocus
                className="bg-transparent border-none text-foreground text-xs w-full"
              />
            ) : (
              <span>{entry.name}</span>
            )}
          </div>
        </DropdownMenuTrigger>
        {menu}
      </DropdownMenu>
    );
  }
};
