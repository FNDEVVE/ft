"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { onlyLetters, removeUser } from "@/util";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";

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
        <Button asChild variant="ghost" size="icon">
          <Link href={`/edit/${row.original.id}`}>
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            removeUser(row.original.id);
          }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
