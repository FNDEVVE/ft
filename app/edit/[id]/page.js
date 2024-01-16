"use client";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

import { toast } from "sonner";
import { useRef, useState, useEffect, useCallback } from "react";
import { onlyLetters } from "@/util";

async function editUser(id, first_name, last_name, avatar) {
  if (first_name || last_name) {
    const res = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name, avatar }),
    });
    const json = await res.json();
    toast(`User with ID ${id} edited to "${first_name} ${last_name}"`);
  } else {
    toast("First or last name can't be empty.");
  }
}

async function getUser(ID) {
  const res = await fetch(`https://reqres.in/api/users/${ID}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  return json.data;
}

export default function Edit({ params }) {
  const [profile, setProfile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const fileInputRef = useRef(null);

  const fetchData = useCallback(async () => {
    const data = await getUser(params.id);
    setProfile(data);
    setAvatar(data.avatar);
  }, [params.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full bg-gray-100 text-gray-700">
      <div className="w-5/6">
        <h1 className="text-4xl w-full text-left mb-8">Edit user</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white rounded-lg shadow-xl p-6 relative">
            <div className="flex-row flex space-x-6">
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="first_name">First name</Label>
                <Input
                  type="text"
                  id="first_name"
                  placeholder="First name"
                  ref={firstNameRef}
                  defaultValue={profile?.first_name || ""}
                />
              </div>
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="last_name">Last name</Label>
                <Input
                  type="text"
                  id="last_name"
                  placeholder="Last name"
                  ref={lastNameRef}
                  defaultValue={profile?.last_name || ""}
                />
              </div>
            </div>
            <Button
              className="bottom-6 absolute bg-green-600"
              onClick={async () => {
                await editUser(
                  params.id,
                  firstNameRef.current.value,
                  lastNameRef.current.value,
                  avatar,
                );
              }}
            >
              Update details
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-6">
            <Avatar className="size-32 mx-auto mb-16 border">
              <AvatarImage src={avatar} className="object-cover" />
              <AvatarFallback>
                {onlyLetters(
                  profile
                    ? `${profile?.first_name} ${profile?.last_name}`
                    : "NU",
                )}
              </AvatarFallback>
            </Avatar>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <Button
              className="w-full"
              variant="outline"
              onClick={handleButtonClick}
            >
              <Camera className="mr-2 size-4" />
              Change photo
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
