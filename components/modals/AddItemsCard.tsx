"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { AddItemsForm } from "../forms/user/additems-form";

export default function AddItemsCard({
  itemID,
  open,
  close,
}: {
  itemID: string;
  open: boolean;
  close: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Items to your Promise Card</DialogTitle>
          <DialogDescription>
            Enter a number of items you would love to receive.
          </DialogDescription>
        </DialogHeader>
        <AddItemsForm itemID={itemID} close={close} />
      </DialogContent>
    </Dialog>
  );
}
