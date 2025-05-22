import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  return (
    new Intl.NumberFormat("mn-MN", {
      style: "decimal",
    }).format(amount) + "₮"
  );
};
