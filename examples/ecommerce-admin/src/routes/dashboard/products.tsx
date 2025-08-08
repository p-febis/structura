import { DataTable } from "@/components/table";
import { useList } from "@structura/react";
import type { Product } from "@/features/products/types";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Product>[] = [
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
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ getValue }) => {
      const rating = getValue<number>();
      const maxStars = 5;
      return (
        <div style={{ display: "flex", gap: 2 }}>
          {Array.from({ length: maxStars }).map((_, i) => (
            <span
              key={i}
              style={{ color: i < Math.round(rating) ? "gold" : "#ccc" }}
            >
              ★
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
];

export const ProductsPage = () => {
  const { data, isLoading } = useList<{ products: Product[] }>();
  const products = data?.products;

  if (isLoading || !products) {
    return "Loading...";
  }

  return (
    <main className="px-4 w-full h-full">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <DataTable columns={columns} data={products} />
      </div>
    </main>
  );
};
