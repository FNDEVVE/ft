import { DataTable } from "@/components/users-table/data-table";
import { columns } from "@/components/users-table/columns";

async function getUsers() {
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

export default async function Home() {
  const data = await getUsers();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full bg-gray-100 text-gray-700">
      <div className="w-5/6">
        <h1 className="text-4xl w-full text-left mb-8">User list</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
