export interface Product {
  id: string;
  sku?: string;
  title: string;
  description: string;
  price: number;
  price_on_sale: number | null;
  image: string;
  sizes: string[];
  category: string;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}
