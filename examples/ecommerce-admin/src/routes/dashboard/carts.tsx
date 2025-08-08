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
  },
  {
    accessorKey: "totalQuantity",
    header: "Total Quantity",
  },
  {
    accessorKey: "total",
    header: "Total Price",
    cell: ({ getValue }) => `$${getValue<number>().toFixed(2)}`,
  },
  {
    accessorKey: "discountedTotal",
    header: "Discounted Total",
    cell: ({ getValue }) => `$${getValue<number>().toFixed(2)}`,
  },
];

export const CartsPage = () => {
  const { data, isLoading } = useList<{ carts: Cart[] }>();
  const carts = data?.carts;

  if (isLoading || !carts) {
    return "Loading...";
  }

  return (
    <main className="px-4 w-full h-full">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Carts</h1>
        <DataTable columns={columns} data={carts} />
      </div>
    </main>
  );
}
