import { DataTable } from "@/components/table";
import type { User } from "@/features/users/types";
import { useList } from "@structura/react";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;
      return `${user.firstName} ${user.lastName}`;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    id: "company",
    header: "Company",
    cell: ({ row }) => row.original.company.name,
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
];

export const UsersPage = () => {
  const { data, isLoading } = useList<{ users: User[] }>();
  const users = data?.users;

  if (isLoading || !users) {
    return "Loading...";
  }

  return (
    <main className="px-4 w-full h-full">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <DataTable columns={columns} data={users} />
      </div>
    </main>
  );
};
