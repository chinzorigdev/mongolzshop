"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { ShoppingCartIcon } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { Button } from "@/components/ui/button";

export default function NavMain() {
  const { state, dispatch } = useCart();

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white">
      <div className="flex items-center justify-between gap-4 md:gap-12 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 h-16 sm:h-24 lg:h-28">
        <div className="flex gap-4 items-center justify-start grow overflow-hidden">
          {" "}
          <Link href="/">
            {" "}
            <Image
              className="h-8 sm:h-12 lg:h-16 hover:opacity-80 transition-all"
              src="/img/yellowlogo.png"
              alt="Company Logo"
              width={300}
              height={64}
            />
          </Link>
        </div>
        <div className="hidden sm:flex justify-center gap-6 items-center shrink-0">
          <div className="flex gap-3 justify-center items-center group">
            {" "}
            <Image
              src="https://d2sucgbhjy7j1n.cloudfront.net/common/icons/phone.gif"
              alt="Animated phone icon"
              className="w-8 hidden group-hover:block"
              width={32}
              height={32}
            />
            <Image
              src="https://d2sucgbhjy7j1n.cloudfront.net/common/icons/phone.png"
              alt="Phone icon"
              className="w-8 block group-hover:hidden"
              style={{ padding: "3px" }}
              width={32}
              height={32}
            />
            <div className="flex flex-col items-start justify-center group max-w-40">
              <p className="text-gray-600 font-semibold group-hover:text-gray-900">
                72444181
              </p>
              <p className="text-gray-400 text-xs group-hover:text-gray-600">
                Ажлын өдөр 09:00-18:00
              </p>
            </div>
          </div>
        </div>
        {/* Cart Icon and Drawer Trigger */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full hover:bg-neutral-100 p-2"
            onClick={() => dispatch({ type: "TOGGLE_CART" })}
            aria-label="Сагс харах"
          >
            <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
      <CartDrawer />
    </nav>
  );
}
