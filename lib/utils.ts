import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toCurrency = (number: number, country: string = "en-NG") => {
  const formatter = new Intl.NumberFormat(country, {
    style: "currency",
    currency: country === "en-NG" ? "NGN" : "GBP",
  });

  return formatter.format(number).split(".00")[0];
};
