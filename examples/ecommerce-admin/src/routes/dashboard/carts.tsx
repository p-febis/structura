import { DataTable } from "@/components/table";
import type { Cart } from "@/features/carts/types";
import { useList } from "@structura/react";
import { type ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<Cart>[] = [
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "totalProducts",
    header: "Total Products",
    accessorFn: (row) =>
    `${row.products.length}`,
  },
  {
    accessorKey: "totalQuantity",
    header: "Total Quantity",
    accessorFn: (row) =>
    `${row.products.reduce((acc, value) => acc + value.quantity, 0)}`,
  },
];

export const CartsPage = () => {
  const { data: carts, isLoading } = useList<Cart[]>();

  if (isLoading || !carts) {
    return "Loading...";
  }

  return (
    <main className="h-full w-full px-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Carts</h1>
        <DataTable columns={columns} data={carts} />
      </div>
    </main>
  );
};
