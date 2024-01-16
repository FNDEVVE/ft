import { DataTable } from "@/components/users-table/data-table";
import { columns } from "@/components/users-table/columns";
import { getUsers } from "@/util";

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
