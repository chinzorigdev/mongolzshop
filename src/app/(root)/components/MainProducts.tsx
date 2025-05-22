"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types"; // Changed ProductType to Product
import { useCart } from "@/lib/cartContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils"; // Assuming formatCurrency will be added to utils.ts
import { toast } from "sonner";
import DOMPurify from "dompurify"; // For sanitizing HTML descriptions

// Skeleton Card Component
const SkeletonCard = () => (
  <div className="border border-yellow-200 shadow group grid grid-cols-2 w-full max-w-lg mx-auto items-end justify-center gap-6 sm:gap-8 bg-yellow-50 p-6 sm:p-8 rounded-lg">
    <div className="relative w-full aspect-w-8 aspect-h-12 rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
    <div className="flex flex-col items-left justify-center gap-4 sm:gap-6">
      <Skeleton className="h-6 w-3/4 mb-2" /> {/* Title */}
      <Skeleton className="h-8 w-1/2 mb-2" /> {/* Size button */}
      <Skeleton className="h-4 w-full mb-1" /> {/* Description line 1 */}
      <Skeleton className="h-4 w-full mb-1" /> {/* Description line 2 */}
      <Skeleton className="h-4 w-2/3 mb-2" /> {/* Description line 3 */}
      <div className="flex flex-col lg:flex-row text-sm sm:text-base justify-between items-end gap-2 pb-2 mt-auto">
        <Skeleton className="h-6 w-1/4" /> {/* Price */}
        <Skeleton className="h-10 w-2/5" /> {/* Button */}
      </div>
    </div>
  </div>
);

export default function MainProducts() {
  const [products, setProducts] = useState<Product[]>([]); // Changed ProductType to Product
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>(
    {}
  );

  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const data = await response.json();
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Fetched data.products is not an array:", data);
          setProducts([]); // Fallback to empty array
          throw new Error("Product data is not in expected format.");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
        setProducts([]); // Ensure products is an array on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [productId]: size,
    }));
    // Close the dropdown manually if needed, e.g. by removing 'hidden' class or using a ref
    // For Flowbite/Tailwind Components, their JS should handle this if attributes are correct.
    const dropdownElement = document.getElementById(`dropdown-${productId}`);
    if (dropdownElement) {
      // This is a direct DOM manipulation, consider a React-way if issues arise
      // For example, manage dropdown visibility with React state per card.
      // However, to keep UI structure, this might be what's expected if using external JS for dropdowns.
      dropdownElement.classList.add("hidden"); // Assuming 'hidden' controls visibility
    }
  };

  const handleAddToCart = (product: Product) => {
    // Changed ProductType to Product
    const selectedSize =
      selectedSizes[product.id] ||
      (product.sizes.length > 0 ? product.sizes[0] : "N/A");

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.title, // This was correct, product.title maps to cartItem.name
        price: product.price_on_sale || product.price,
        image: product.image,
        size: selectedSize,
        quantity: 1,
      },
    });
    toast.success(`${product.title} (${selectedSize}) сагсанд нэмэгдлээ.`);
    dispatch({ type: "OPEN_CART" }); // Open cart drawer
  };

  // Toggle dropdown visibility - a more React-way to handle this
  // You would need to add a state like: const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const toggleDropdown = (productId: string) => {
    const dropdownElement = document.getElementById(`dropdown-${productId}`);
    if (dropdownElement) {
      dropdownElement.classList.toggle("hidden");
      if (!dropdownElement.classList.contains("hidden")) {
        // Potentially position it using Popper.js if it's not automatic
        // This part is tricky if relying on external JS like Flowbite.
        // For simplicity, this example just toggles 'hidden'.
        // A robust solution might involve a React-based dropdown component.
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-6 px-4 sm:py-8 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b pb-1 mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-600">
            Бүх бараа
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-3 md:gap-x-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-6 px-4 sm:py-8 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-600 mb-4">
          Бүх бараа
        </h2>
        <p className="text-red-500">Алдаа гарлаа: {error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Дахин оролдох
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto py-6 px-4 sm:py-8 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-600 mb-4">
          Бүх бараа
        </h2>
        <p>Илэрц олдсонгүй.</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto py-6 px-4 sm:py-8 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b pb-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-600">
            Бүх бараа
          </h2>
        </div>
      </div>
      <div className="py-6">
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          // data-aos="zoom-in" data-aos-duration="2000" // AOS can be kept if desired
        >
          <div className="mb-9 lg:mb-10 xl:mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-3 md:gap-x-6">
              {products.map(
                (
                  product: Product // Added type Product to product parameter
                ) => (
                  <div
                    key={product.id}
                    data-product={product.id}
                    className="border border-yellow-200 shadow group grid grid-cols-2 w-full max-w-lg mx-auto items-stretch justify-center gap-6 sm:gap-8 bg-yellow-50 p-6 sm:p-8 rounded-lg"
                  >
                    <div className="relative w-full aspect-w-8 aspect-h-12 rounded-lg overflow-hidden flex items-center justify-center">
                      <Link
                        href={`/products/${product.id}`}
                        legacyBehavior={false}
                      >
                        <Image
                          src={product.image || "/img/placeholder.png"} // Fallback image
                          alt={product.title}
                          className="w-full h-full object-contain group-hover:opacity-75 transition-opacity duration-300"
                          width={400} // Provide appropriate width
                          height={600} // Provide appropriate height
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col items-start justify-between gap-3 sm:gap-4">
                      {" "}
                      {/* Changed to items-start and justify-between for better layout control */}
                      <div className="w-full">
                        <div className="line-clamp-2 mb-1">
                          <Link
                            href={`/products/${product.id}`}
                            legacyBehavior={false}
                          >
                            <span className="block text-left text-base sm:text-lg font-semibold text-gray-900 hover:text-yellow-600 cursor-pointer">
                              {product.title}
                            </span>
                          </Link>
                        </div>

                        {product.sizes && product.sizes.length > 0 && (
                          <div className="relative">
                            <button
                              onClick={() => toggleDropdown(product.id)}
                              // data-dropdown-toggle={`dropdown-${product.id}`} // Kept for compatibility if Flowbite/etc. JS is used
                              className="text-yellow-600 font-medium text-sm inline-flex items-center max-w-full py-1 px-2 border border-yellow-400 rounded hover:bg-yellow-100"
                              type="button"
                            >
                              <span className="truncate">
                                {selectedSizes[product.id] || product.sizes[0]}
                              </span>
                              <svg
                                className="w-3.5 h-3.5 pt-0.5 ml-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </button>
                            <div
                              id={`dropdown-${product.id}`}
                              className="z-20 bg-white divide-y divide-gray-200 rounded shadow w-auto hidden absolute mt-1" // Added 'absolute' and 'mt-1' for positioning
                              // style={{ position: "absolute", inset: "0px auto auto 0px", margin: "0px" }} // Removed fixed transform
                              data-popper-placement="bottom-start" // Adjusted for popper
                            >
                              <ul
                                className="py-1 divide-y divide-gray-200 text-sm text-gray-700"
                                aria-labelledby={`dropdown-button-${product.id}`} // Give button an id if using this
                              >
                                {product.sizes.map(
                                  (
                                    size: string // Added type string to size parameter
                                  ) => (
                                    <li key={size}>
                                      <button
                                        onClick={() =>
                                          handleSizeSelect(product.id, size)
                                        }
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                      >
                                        {size}
                                      </button>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                      {product.description && (
                        <div
                          className="text-xs sm:text-sm text-gray-500 text-left line-clamp-3 my-2 mce-content-body" // line-clamp for brevity
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(product.description),
                          }}
                        />
                      )}
                      <div className="w-full mt-auto pt-2">
                        {" "}
                        {/* Pushes price and button to bottom */}
                        <p className="text-yellow-600 font-bold text-base sm:text-lg tugrik mb-2 text-left">
                          {formatCurrency(
                            product.price_on_sale || product.price
                          )}
                          {product.price_on_sale && (
                            <span className="text-gray-400 line-through ml-2 text-sm">
                              {formatCurrency(product.price)}
                            </span>
                          )}
                        </p>
                        <Button
                          onClick={() => handleAddToCart(product)}
                          variant="outline"
                          className="w-full flex gap-2 items-center justify-center text-gray-600 hover:text-yellow-700 hover:border-yellow-500 border-gray-400"
                          size="default"
                        >
                          <svg
                            className="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            ></path>
                          </svg>
                          <span className="block">Захиалах</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
