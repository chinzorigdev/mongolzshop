export interface Product {
  id: string;
  sku?: string;
  brand?: string;
  title: string;
  description: string;
  price: number;
  price_on_sale: number | null;
  color?: string;
  image: string;
  sizes: string[];
  category: string;
  quantity: number; // Шинэ талбар
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}
