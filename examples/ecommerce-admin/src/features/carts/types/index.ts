import type { Product } from "@/features/products/types";

export type Cart = {
  id: number;
  userId: number;
  products: Product & { quantity: number }[];
};
