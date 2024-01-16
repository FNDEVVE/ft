"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { onlyLetters } from "@/util";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

export const columns = [
  {
    accessorKey: "avatar",
    header: "",
    cell: ({ row }) => (
      <Avatar className={"size-12"}>
        <AvatarImage src={row.getValue("avatar")} className="object-cover" />
        <AvatarFallback>
          {onlyLetters(row.getValue("full_name"))}
        </AvatarFallback>
      </Avatar>
    ),
  },
  { accessorKey: "full_name", header: "Full name" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
