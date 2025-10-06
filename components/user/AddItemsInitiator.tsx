"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import AddItemsCard from "../modals/AddItemsCard";

export default function AddItemsInitiator({ itemID }: { itemID: string }) {
  const [openCardModal, setOpenCardModal] = useState(false);
  return (
    <>
      <Button
        variant="default"
        type="button"
        onClick={() => setOpenCardModal(true)}
        className="rounded-[100px] h-11 cursor-pointer p-3 text-white text-sm font-medium leading-[145%]"
      >
        <Plus size={20} />
        Add Items
      </Button>
      <AddItemsCard
        itemID={itemID}
        open={openCardModal}
        close={() => setOpenCardModal(false)}
      />
    </>
  );
}
