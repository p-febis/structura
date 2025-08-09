import { DataTable } from "@/components/table";
import type { User } from "@/features/users/types";
import { useList } from "@structura/react";
import type { ColumnDef } from "@tanstack/react-table";

const capitalizeFirstLetter = (toCapitalize: string) => {
  const [firstLetter] = toCapitalize;

  return firstLetter.toUpperCase() + toCapitalize.slice(1);
};

export const columns: ColumnDef<User>[] = [
  {
    id: "fullName",
    header: "Name",
    accessorFn: (row) =>
      `${capitalizeFirstLetter(row.name.firstname)} ${capitalizeFirstLetter(row.name.lastname)}`,
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
    accessorKey: "username",
    header: "Username",
  },
];

export const UsersPage = () => {
  const { data: users, isLoading } = useList<User[]>();

  if (isLoading || !users) {
    return "Loading...";
  }

  return (
    <main className="h-full w-full px-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <DataTable columns={columns} data={users} />
      </div>
    </main>
  );
};
