"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import ShareCard from "../modals/ShareCard";

export default function ShareLinkInitiator({ linkId }: { linkId: string }) {
  const [openCardModal, setOpenCardModal] = useState(false);
  return (
    <>
      <Button
        variant="default"
        type="button"
        onClick={() => setOpenCardModal(true)}
        className="rounded-3xl h-9 cursor-pointer p-3 text-white text-sm font-medium leading-[145%]"
      >
        Share Promise Card
        <Send size={16} />
      </Button>
      <ShareCard
        linkId={linkId}
        open={openCardModal}
        close={() => setOpenCardModal(false)}
      />
    </>
  );
}
