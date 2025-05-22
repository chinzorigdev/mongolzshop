// filepath: c:\Users\user\Desktop\web\mongolzshop\src\app\(root)\components\CartDrawer.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cartContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Trash2Icon, XIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

export default function CartDrawer() {
  const { state, dispatch } = useCart();

  const handleRemoveItem = (id: string, size: string, name: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, size } });
    toast.error(`${name} (${size}) сагснаас хасагдлаа.`);
  };

  const handleUpdateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) {
      // Optionally remove if quantity is less than 1, or prevent it
      // For now, just don't update to less than 1
      return;
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, size, quantity } });
  };

  return (
    <Sheet
      open={state.isCartOpen}
      onOpenChange={(isOpen) =>
        dispatch({ type: isOpen ? "OPEN_CART" : "CLOSE_CART" })
      }
    >
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="text-lg font-semibold text-gray-900">
            Таны сагс
          </SheetTitle>
          <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <XIcon className="h-5 w-5" />
            <span className="sr-only">Хаах</span>
          </SheetClose>
        </SheetHeader>
        <Separator />

        {state.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <Image
              src="/img/empty-cart.svg" // Replace with your actual empty cart image
              alt="Хоосон сагс"
              width={120}
              height={120}
              className="mb-6 opacity-50"
            />
            <p className="text-neutral-600 text-lg mb-2">
              Таны сагс хоосон байна.
            </p>
            <p className="text-neutral-500 text-sm mb-6">
              Худалдан авалт хийхийн тулд бараа нэмнэ үү.
            </p>
            <SheetClose asChild>
              <Button variant="outline">Дэлгүүр лүү буцах</Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-5">
                {state.items.map((item) => (
                  <li
                    key={`${item.id}-${item.size}`}
                    className="flex items-start space-x-4 py-4 border-b border-neutral-200 last:border-b-0"
                  >
                    <div className="relative h-20 w-20 rounded-md overflow-hidden bg-neutral-100 flex-shrink-0">
                      <Image
                        src={item.image || "/img/placeholder.png"}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-800 truncate hover:text-yellow-600">
                        <Link href={`/products/${item.id}`} passHref>
                          <SheetClose asChild>
                            <span>{item.name}</span>
                          </SheetClose>
                        </Link>
                      </h3>
                      {item.size && item.size !== "N/A" && (
                        <p className="text-xs text-gray-500">
                          Размер: {item.size}
                        </p>
                      )}
                      <div className="flex items-center mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 text-xs"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <span className="mx-2.5 text-sm font-medium w-5 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 text-xs"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-gray-800">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="mt-1 text-neutral-500 hover:text-red-600 h-7 w-7"
                        onClick={() =>
                          handleRemoveItem(item.id, item.size, item.name)
                        }
                      >
                        <Trash2Icon className="h-4 w-4" />
                        <span className="sr-only">Хасах</span>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
            <Separator />
            <SheetFooter className="p-6 bg-neutral-50">
              <div className="w-full space-y-3">
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-600">Нийт дүн:</dt>
                  <dd className="font-medium text-gray-800">
                    {formatCurrency(state.total)}
                  </dd>
                </div>
                {/* <div className="flex justify-between text-sm">
                  <dt className="text-gray-600">Хүргэлт:</dt>
                  <dd className="font-medium text-gray-800">Тооцоогүй</dd>
                </div> */}
                <Separator />
                <div className="flex justify-between text-base font-semibold">
                  <dt className="text-gray-900">Төлөх дүн:</dt>
                  <dd className="text-gray-900">
                    {formatCurrency(state.total)}
                  </dd>
                </div>
              </div>
              <SheetClose asChild>
                <Button
                  asChild
                  className="w-full mt-4 text-base"
                  size="lg"
                  disabled={state.items.length === 0}
                >
                  <Link href="/checkout">Захиалга хийх</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => dispatch({ type: "CLOSE_CART" })}
                >
                  Худалдан авалтаа үргэлжлүүлэх
                </Button>
              </SheetClose>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
