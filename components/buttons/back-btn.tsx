"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

export default function BackBtn() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="rounded-full flex items-center justify-center size-8 bg-gray-100 text-black cursor-pointer"
    >
      <ArrowLeft />
    </button>
  );
}
