import { FileText, Folder } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { cn } from "@/lib/utils";
import { DirEntry } from "./ProjectExplorer";

interface FileTreeItemProps {
  entry: DirEntry;
  level: number;
  onFileOpen: (filePath: string) => void;
}

export const FileTreeItem = ({ entry, level, onFileOpen }: FileTreeItemProps) => {
  const indentClass = `pl-${level * 4}`;

  console.log("onFileOpen in FileTreeItem:", onFileOpen);

  if (entry.is_dir) {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={entry.path}>
          <AccordionTrigger
            className={cn("flex items-center py-1 hover:bg-accent/50 text-xs", indentClass)}
          >
            <div className="flex items-center">
            <Folder size={16} className="mr-1" />

            <span className="text-foreground text-xs">{entry.name}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-xs">
            {entry.children && entry.children.map((child) => (
              <FileTreeItem
                key={child.path}
                entry={child}
                level={level + 1}
                onFileOpen={onFileOpen}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  } else {
    return (
      <div
        className={cn("flex items-center py-1 cursor-pointer hover:bg-accent/50 text-xs", indentClass)}
        onClick={() => onFileOpen(entry.path)}
      >
        <FileText size={16} className="mr-1 text-foreground text-xs" />
        <span>{entry.name}</span>
      </div>
    );
  }
};
