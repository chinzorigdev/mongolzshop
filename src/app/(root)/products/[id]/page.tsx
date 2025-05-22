"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cartContext";
import { toast } from "sonner";
import { Product as ProductType } from "@/types"; // Import ProductType
import { formatCurrency } from "@/lib/utils"; // Import formatCurrency

interface ProductPageProps {
  params: Promise<{ id: string }>; // Changed params to a Promise
}

export default function ProductDetailPage({
  params: paramsPromise,
}: ProductPageProps) {
  const params = React.use(paramsPromise); // Unwrap the Promise using React.use()
  const { id: productId } = params; // Access id from the unwrapped params
  const { dispatch } = useCart();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [nameOnJersey, setNameOnJersey] = useState("");
  const [isNameOnJerseyChecked, setIsNameOnJerseyChecked] = useState(false);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/products/${productId}`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.error ||
                `Failed to fetch product: ${response.statusText}`
            );
          }
          const data: ProductType = await response.json();
          setProduct(data);
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0]);
          }
        } catch (err: unknown) {
          console.error("Error fetching product:", err);
          if (err instanceof Error) {
            setError(err.message || "An unknown error occurred");
          } else {
            setError("An unknown error occurred");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      if (!selectedSize && product.sizes && product.sizes.length > 0) {
        toast.error("Барааны хэмжээг сонгоно уу.");
        return;
      }
      let titleWithJerseyName = product.title; // Use product.title
      const currentPrice = product.price_on_sale ?? product.price;
      if (isNameOnJerseyChecked && nameOnJersey.trim() !== "") {
        titleWithJerseyName += ` (${nameOnJersey.trim()})`;
      }

      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: product.id, // Use product.id
          name: titleWithJerseyName, // Changed from title to name
          price: currentPrice,
          image: product.image,
          size:
            selectedSize ||
            (product.sizes && product.sizes.length > 0
              ? product.sizes[0]
              : "N/A"),
          quantity: 1,
        },
      });

      toast.success(`${titleWithJerseyName} сагсанд нэмэгдлээ!`);
      dispatch({ type: "OPEN_CART" });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Алдаа гарлаа: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Бүтээгдэхүүн олдсонгүй.
      </div>
    );
  }

  return (
    <>
      <div data-product="" className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 md:gap-12 lg:gap-20">
            {/* Бүтээгдэхүүний зургууд */}
            <div>
              <div data-product-images="" className="flex flex-col gap-6">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-300">
                  <Image
                    id="main-image"
                    src={product.image}
                    alt={product.title} // Use product.title for alt text
                    className="w-full h-full object-contain transition-opacity duration-300 ease-in-out"
                    width={900}
                    height={900}
                    priority
                  />
                </div>
              </div>
            </div>
            {/* Бүтээгдэхүүний мэдээлэл */}
            <div className="space-y-6">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product.title} {/* Use product.title for display */}
              </h1>
              <p className="text-3xl text-neutral-600 font-bold">
                {formatCurrency(product.price_on_sale ?? product.price)}
                {isNameOnJerseyChecked &&
                  nameOnJersey.trim() !== "" &&
                  " (+10,000₮ нэр)"}
              </p>

              {/* dangerouslySetInnerHTML ашиглахдаа болгоомжтой байх, XSS халдлагаас сэргийлэх */}
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>

              {/* Өмсгөл дээр нэр бичүүлэх (зөвхөн category === 'jersey' үед) */}
              {product.category === "jersey" && (
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="name_on_jersey_checkbox"
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded mt-1"
                    checked={isNameOnJerseyChecked}
                    onChange={(e) => setIsNameOnJerseyChecked(e.target.checked)}
                  />
                  <div>
                    <label
                      htmlFor="name_on_jersey_checkbox"
                      className="font-medium text-gray-700"
                    >
                      Өмсгөл дээр нэр бичүүлэх (+10,000₮)
                    </label>
                    <p className="text-xs text-gray-500">
                      Нэрээ доорх талбарт оруулна уу.
                    </p>
                    {isNameOnJerseyChecked && (
                      <input
                        type="text"
                        value={nameOnJersey}
                        onChange={(e) => setNameOnJersey(e.target.value)}
                        placeholder="НЭР"
                        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Хэмжээ сонгох */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Хэмжээ: {selectedSize}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`size-btn px-5 py-2 rounded-md font-medium uppercase transition border-2 ${
                          selectedSize === size
                            ? "bg-indigo-500 text-white border-indigo-500"
                            : "border-gray-300 text-gray-700 hover:bg-indigo-500 hover:text-white hover:border-indigo-500"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Сагсанд нэмэх товч */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock} // Disable if not in stock
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-colors"
              >
                {product.inStock ? "Сагсанд нэмэх" : "Дууссан"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
