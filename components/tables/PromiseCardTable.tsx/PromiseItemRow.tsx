"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Item = {
  _id: string;
  name: string;
  isPromised: boolean;
  promisedBy?: string;
};

interface PromiseItemRowProps {
  item: Item;
  index: number;
}

export default function PromiseItemRow({ item, index }: PromiseItemRowProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [giverName, setGiverName] = useState("");

  const handlePromise = () => {
    alert(`Thank you, ${giverName}! You've promised to give "${item.name}".`);
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
          <Input
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
          <Button onClick={handlePromise} disabled={!giverName} size="sm">
            Promise
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
