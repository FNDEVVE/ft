import { toast } from "sonner";

export const onlyLetters = (str) => str.match(/[A-Z]/g).join("");

export async function getUsers() {
  const res = await fetch("https://reqres.in/api/users?per_page=12", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  return json.data.map((item) => ({
    id: item.id,
    email: item.email,
    full_name: `${item.first_name} ${item.last_name}`,
    avatar: item.avatar,
  }));
}

export async function addUser(first_name, last_name, avatar) {
  if (first_name || last_name) {
    const res = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name, avatar }),
    });
    const json = await res.json();
    toast(`User "${first_name} ${last_name}" created with ID ${json.id}`);
  } else {
    toast("First or last name can't be empty.");
  }
}

export async function editUser(id, first_name, last_name, avatar) {
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

export async function getUser(ID) {
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

export async function removeUser(ID) {
  const res = await fetch(`https://reqres.in/api/users/${ID}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (res.status === 204) toast(`User ID ${ID} deleted successfully`);
  return res;
}
