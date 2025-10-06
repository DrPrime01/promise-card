"use client";

import { useRef } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Files } from "lucide-react";
import { SiTelegram, SiGmail } from "react-icons/si";
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { handleShare } from "@/lib/utils";

export default function ShareCard({
  open,
  close,
  linkId,
}: {
  open: boolean;
  close: () => void;
  linkId: string;
}) {
  const linkRef = useRef<HTMLDivElement>(null);
  const shareURL = `https://promisecard.com/sh/${linkId}`;

  const handleCopy = () => {
    if (linkRef?.current) {
      navigator.clipboard.writeText(linkRef.current.innerText);
      toast.info("Link copied");
    }
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="p-4 sm:max-w-[423px]" showCloseButton={false}>
        <DialogTitle className="sr-only">Success Modal</DialogTitle>
        <div className="flex flex-col items-center gap-y-4 text-center">
          <Image
            src="/images/success.png"
            alt="success"
            width={368}
            height={176}
            className="w-full grayscale"
          />
          <div>
            <p className="text-2xl text-black font-semibold mb-2">
              You&apos;re good to go!
            </p>
            <p className="text-[#8B8D98] text-sm text-balance">
              Your promise card link has been created successfully and is ready
              to share
            </p>
          </div>
          <div className="flex items-center gap-x-2.5 w-full">
            <div
              ref={linkRef}
              className="flex-1 font-medium text-base leading-[24px] tracking-[-0.1px] text-gray-7900 rounded-sm border border-[#E5E7EB] p-2.5 max-w-[297px] truncate"
            >
              {shareURL}
            </div>
            <button
              onClick={handleCopy}
              className="shrink-0 rounded-sm border border-[#E5E7EB] p-2.5 flex items-center gap-x-2 font-medium cursor-pointer"
            >
              <Files size={16} />
              Copy
            </button>
          </div>

          <div className="flex items-center gap-x-2 w-full">
            <hr className="h-px w-full border-[#E5E7EB]" />
            <p className="text-sm text-[#8B8D98] font-medium shrink-0">
              OR SHARE WITH
            </p>
            <hr className="h-px w-full border-[#E5E7EB]" />
          </div>

          <div className="flex justify-center gap-5">
            <button
              type="button"
              onClick={() => handleShare("twitter", shareURL)}
              className="size-11 rounded-full border border-[#E6E6E8] flex items-center justify-center cursor-pointer"
            >
              <FaXTwitter />
            </button>
            <button
              type="button"
              onClick={() => handleShare("telegram", shareURL)}
              className="size-11 rounded-full border border-[#E6E6E8] flex items-center justify-center cursor-pointer"
            >
              <SiTelegram />
            </button>
            <button
              type="button"
              onClick={() => handleShare("gmail", shareURL)}
              className="size-11 rounded-full border border-[#E6E6E8] flex items-center justify-center cursor-pointer"
            >
              <SiGmail />
            </button>
            <button
              type="button"
              onClick={() => handleShare("whatsapp", shareURL)}
              className="size-11 rounded-full border border-[#E6E6E8] flex items-center justify-center cursor-pointer"
            >
              <FaWhatsapp />
            </button>
          </div>

          <Button
            variant="default"
            onClick={close}
            className="w-full rounded-full h-[60px] text-white text-lg leading-7 font-medium cursor-pointer"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
