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

export const handleShare = (
  platform: "twitter" | "telegram" | "gmail" | "whatsapp",
  shareUrl: string
) => {
  let url = "";

  switch (platform) {
    case "twitter":
      url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent("Check out my promise card!")}`;
      break;
    case "telegram":
      url = `https://t.me/share/url?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent("Check out my promise card!")}`;
      break;
    case "gmail":
      url = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
        "My Promise Card"
      )}&body=${encodeURIComponent(shareUrl)}`;
      break;
    case "whatsapp":
      url = `https://wa.me/?text=${encodeURIComponent(
        "Check out my promise card! " + shareUrl
      )}`;
      break;
    default:
      return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
};
