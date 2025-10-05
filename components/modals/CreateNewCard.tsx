"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { NewCardForm } from "../forms/user/newcard-form";

export default function CreateNewCard({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Promise Card</DialogTitle>
          <DialogDescription>
            Enter the title and occasion for your new card.
          </DialogDescription>
        </DialogHeader>
        <NewCardForm />
      </DialogContent>
    </Dialog>
  );
}
