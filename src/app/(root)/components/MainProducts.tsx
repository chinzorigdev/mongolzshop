"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  price_on_sale: number | null;
  image: string;
  sizes: string[];
}

export default function MainProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle size selection
  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes({
      ...selectedSizes,
      [productId]: size,
    });
  };

  // Function to add to cart
  const addToCart = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    // Here you would implement your cart functionality
    console.log("Adding to cart:", { ...product, size });

    // Example: Open cart drawer
    const cartDrawer = document.querySelector('[data-drawer="cart"]');
    if (cartDrawer) {
      cartDrawer.classList.add("open");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
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
          data-aos="zoom-in"
          data-aos-duration="2000"
        >
          <div className="mb-9 lg:mb-10 xl:mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-3 md:gap-x-6">
              <div
                data-product=""
                className="border border-yellow-200 shadow group grid grid-cols-2 w-full max-w-lg mx-auto items-end justify-center gap-6 sm:gap-8 bg-yellow-50 p-6 sm:p-8 rounded-lg aos-init aos-animate"
              >
                <div className="relative w-full aspect-w-8 aspect-h-12 rounded-lg overflow-hidden">
                  <a href="product.html">
                    <Image
                      src="https://kom-uploads.s3.amazonaws.com/store-1599/product-17624--1733167005-w400.jpg"
                      alt="The MongolZ - Pro Jersey 2025"
                      className="w-full h-full object-center object-cover"
                      width={400}
                      height={600}
                    />
                  </a>
                </div>
                <div className="flex flex-col items-left justify-center gap-4 sm:gap-6">
                  <div className="line-clamp-2">
                    <a
                      href="product.html"
                      className="block text-left text-base sm:text-lg font-semibold text-gray-900"
                    >
                      The MongolZ - Pro Jersey&nbsp;2025
                    </a>
                  </div>
                  <button
                    data-dropdown-toggle="dropdown-product-17624-61293"
                    className="text-yellow-600 font-medium text-sm inline-flex items-center max-w-full"
                    type="button"
                  >
                    <span
                      data-product-option="17624"
                      data-product-option-idx="1"
                      className="truncate"
                    >
                      XL
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
                    id="dropdown-product-17624-61293"
                    className="z-20 bg-white divide-y divide-gray-200 rounded shadow w-auto hidden"
                    style={{
                      position: "absolute",
                      inset: "0px auto auto 0px",
                      margin: "0px",
                      transform: "translate(375px, 201px)",
                    }}
                    data-popper-placement="bottom"
                  >
                    <ul
                      className="py-1 divide-y divide-gray-200 text-sm text-gray-700"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <a
                          href="#"
                          data-action="product_option_choose"
                          data-action-option-idx="1"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleSizeSelect("17624", "XL")}
                        >
                          XL
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-action="product_option_choose"
                          data-action-option-idx="2"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleSizeSelect("17624", "2XL")}
                        >
                          2XL
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-action="product_option_choose"
                          data-action-option-idx="3"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleSizeSelect("17624", "3XL")}
                        >
                          3XL
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-action="product_option_choose"
                          data-action-option-idx="4"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleSizeSelect("17624", "5XL")}
                        >
                          5XL
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="text-sm sm:text-base text-gray-500 text-left">
                    <div className="mce-content-body line-clamp-6 x-fix-line-clamp-6">
                      <p>Official Jersey.</p>
                      <p>
                        <em>Ази size учраас нэг size томруулж аваарай.</em>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row text-sm sm:text-base justify-between items-end gap-2 pb-2">
                    <p className="text-yellow-600 font-bold tugrik">150’000</p>
                    <a
                      data-drawer-open="cart"
                      href="#"
                      className="flex gap-2 items-center justify-center text-gray-500 hover:text-yellow-600"
                      onClick={() =>
                        addToCart({
                          id: "17624",
                          title: "The MongolZ - Pro Jersey 2025",
                          description: "Official Jersey.",
                          price: 150000,
                          price_on_sale: null,
                          image:
                            "https://kom-uploads.s3.amazonaws.com/store-1599/product-17624--1733167005-w400.jpg",
                          sizes: ["XL", "2XL", "3XL", "5XL"],
                        })
                      }
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
                    </a>
                  </div>
                </div>
              </div>

              <div
                data-product=""
                className="border border-pink-200 shadow group grid grid-cols-2 w-full max-w-lg mx-auto items-end justify-center gap-6 sm:gap-8 bg-pink-50 p-6 sm:p-8 rounded-lg aos-init aos-animate"
                data-aos="zoom-in"
                data-aos-duration="1500"
              >
                <div className="relative w-full aspect-w-8 aspect-h-12 rounded-lg overflow-hidden">
                  <a href="/product/63535">
                    <Image
                      src="https://kom-uploads.s3.amazonaws.com/store-1599/product-63535--1736944491-w400.jpg"
                      alt="The MongolZ - Kids Jersey (No Sponsor Logos)"
                      className="w-full h-full object-center object-cover"
                      width={400}
                      height={600}
                    />
                  </a>
                </div>
                <div className="flex flex-col items-left justify-center gap-4 sm:gap-6">
                  <div className="line-clamp-2">
                    <a
                      href="/product/63535"
                      className="block text-left text-base sm:text-lg font-semibold text-gray-900"
                    >
                      The MongolZ - Kids Jersey (No Sponsor Logos)
                    </a>
                  </div>
                  <button
                    data-dropdown-toggle="dropdown-product-63535-94564"
                    className="text-pink-600 font-medium text-sm inline-flex items-center max-w-full"
                    type="button"
                  >
                    <span
                      data-product-option="63535"
                      data-product-option-idx="1"
                      className="truncate"
                    >
                      2XS
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
                    id="dropdown-product-63535-94564"
                    className="z-20 bg-white divide-y divide-gray-200 rounded shadow w-auto hidden"
                    style={{
                      position: "absolute",
                      inset: "0px auto auto 0px",
                      margin: "0px",
                      transform: "translate(375px, 225px)",
                    }}
                    data-popper-placement="bottom"
                  >
                    <ul
                      className="py-1 divide-y divide-gray-200 text-sm text-gray-700"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <a
                          href="#"
                          data-action="product_option_choose"
                          data-action-option-idx="1"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleSizeSelect("63535", "2XS")}
                        >
                          2XS
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-action="product_option_choose"
                          data-action-option-idx="2"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleSizeSelect("63535", "3XS")}
                        >
                          3XS
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-action="product_option_choose"
                          data-action-option-idx="3"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleSizeSelect("63535", "4XS")}
                        >
                          4XS
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-action="product_option_choose"
                          data-action-option-idx="4"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleSizeSelect("63535", "5XS")}
                        >
                          5XS
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="text-sm sm:text-base text-gray-500 text-left">
                    <div className="mce-content-body line-clamp-6 x-fix-line-clamp-6">
                      <p>Хүүхдэд зориулсан жижиг размерын өмсгөл.</p>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row text-sm sm:text-base justify-between items-end gap-2 pb-2">
                    <p className="text-pink-600 font-bold tugrik">80’000</p>
                    <a
                      data-drawer-open="cart"
                      href="#"
                      className="flex gap-2 items-center justify-center text-gray-500 hover:text-pink-600"
                      onClick={() =>
                        addToCart({
                          id: "63535",
                          title: "The MongolZ - Kids Jersey (No Sponsor Logos)",
                          description:
                            "Хүүхдэд зориулсан жижиг размерын өмсгөл.",
                          price: 80000,
                          price_on_sale: null,
                          image:
                            "https://kom-uploads.s3.amazonaws.com/store-1599/product-63535--1736944491-w400.jpg",
                          sizes: ["2XS", "3XS", "4XS", "5XS"],
                        })
                      }
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
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
