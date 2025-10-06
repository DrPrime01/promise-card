"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { handleError } from "@/lib/error";
import { toast } from "sonner";
import BaseInput from "@/components/form-fields/base/input-field";
import { Spinner } from "@/components/ui/spinner";

type Item = {
  _id: string;
  name: string;
  isPromised: boolean;
  promisedBy?: string;
};

interface PromiseItemRowProps {
  item: Item;
  index: number;
  shareableId: string;
}

export default function PromiseItemRow({
  item,
  index,
  shareableId,
}: PromiseItemRowProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [giverName, setGiverName] = useState("");

  const handlePromise = async () => {
    setIsLoading(true);
    try {
      const payload = { isPromised: isChecked, promisedBy: giverName };

      const res = await fetch(`/api/lists/${shareableId}/items/${item?._id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setIsLoading(false);
      toast.success(data.message);
      router.refresh();
      setGiverName("");
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  };

  const isAlreadyPromised = item.isPromised;

  return (
    <TableRow>
      <TableCell className="text-center font-medium">{index + 1}</TableCell>
      <TableCell className="font-medium">
        <span
          className={cn(
            isAlreadyPromised && "line-through text-muted-foreground"
          )}
        >
          {item.name}
        </span>
      </TableCell>
      <TableCell className="text-center">
        <Checkbox
          checked={isAlreadyPromised || isChecked}
          disabled={isAlreadyPromised}
          onCheckedChange={(checked) => setIsChecked(checked as boolean)}
        />
      </TableCell>
      <TableCell>
        {isAlreadyPromised ? (
          <span className="font-semibold text-muted-foreground">
            {item.promisedBy}
          </span>
        ) : (
          <BaseInput
            name="name"
            type="text"
            placeholder="Your name..."
            disabled={!isChecked}
            value={giverName}
            onChange={(e) => setGiverName(e.target.value)}
          />
        )}
      </TableCell>
      <TableCell className="text-right">
        {isChecked && !isAlreadyPromised && (
          <Button
            type="button"
            onClick={handlePromise}
            disabled={!giverName || isLoading}
            size="sm"
            className="cursor-pointer"
          >
            {isLoading ? <Spinner /> : "Promise"}
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
