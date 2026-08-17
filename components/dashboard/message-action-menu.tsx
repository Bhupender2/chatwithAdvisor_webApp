"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface MessageActionMenuProps {
  messageId: string;
  onDelete?: (id: string) => void;
}

export default function MessageActionMenu({
  messageId,
  onDelete,
}: MessageActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="opacity-0 group-hover:opacity-100 absolute top-1 -right-1 transition-opacity">
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          // onClick={() => onDelete?.(messageId)}
          className="text-red-600 focus:text-red-600"
        >
          Delete for everyone
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
