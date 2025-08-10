import { DataTable } from "@/components/table";
import { useList } from "@structura/react";
import type { Product } from "@/features/products/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ getValue }) => (
      <div className="flex min-h-[50px] items-center justify-center">
        <img
          src={getValue<string>()}
          width={50}
          height={50}
          className="rounded-md object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => `$${getValue<number>().toFixed(2)}`,
  },
];

export const ProductsPage = () => {
  const { data: products, isLoading } = useList<Product[]>();

  if (isLoading || !products) {
    return "Loading...";
  }

  return (
    <main className="h-full w-full px-4">
      <div className="space-y-4">
        <div className="inline-flex w-full justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <Button asChild>
            <Link to="create">Create Product</Link>
          </Button>
        </div>
        <DataTable columns={columns} data={products} />
      </div>
    </main>
  );
};
