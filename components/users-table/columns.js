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
    className: "w-10 md:w-12",
    cell: ({ row }) => (
      <Avatar className={"size-10 md:size-12"}>
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
    className: "w-24 md:w-36",
    cell: ({ row }) => (
      <div className="-ml-2">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/edit/${row.original.id}`}>
            <Button variant="ghost" size="icon">
              <Edit className="size-4" />
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
          <Trash className="size-4" />
        </Button>
      </div>
    ),
  },
];
