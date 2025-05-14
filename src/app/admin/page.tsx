"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { toast } from "sonner";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return (
      new Intl.NumberFormat("mn-MN", {
        style: "decimal",
      }).format(amount) + "₮"
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neutral-900"></div>
      </div>
    );
  }
  return (
    <div className="h-screen mx-auto p-4 ">
      <h1 className="flex justify-center  ">Admin Page</h1>
      <p className="flex justify-center">This is the admin page.</p>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Sizes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>
                  {product.price_on_sale ? (
                    <div>
                      <span className="line-through text-neutral-400">
                        {formatCurrency(product.price)}
                      </span>
                      <span className="ml-2 text-red-500">
                        {formatCurrency(product.price_on_sale)}
                      </span>
                    </div>
                  ) : (
                    formatCurrency(product.price)
                  )}
                </TableCell>
                <TableCell>{product.sizes.join(", ")}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      product.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
