"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type Item = {
  _id: string;
  name: string;
  isPromised: boolean;
  promisedBy?: string;
};

interface OwnerItemsTableProps {
  items: Item[];
}

export function OwnerItemsTable({ items }: OwnerItemsTableProps) {
  const handleDelete = (itemId: string, itemName: string) => {
    // In a real app, this would trigger a DELETE API call
    // DELETE /api/lists/{listId}/items/{itemId}
    alert(`Are you sure you want to delete "${itemName}"?`);
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4">Item</TableHead>
            <TableHead className="w-[150px] px-4">Status</TableHead>
            <TableHead className="px-4">Promised By</TableHead>
            <TableHead className="text-right w-[100px] px-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((item) => (
            <TableRow key={item?._id}>
              <TableCell className="font-medium px-4">{item?.name}</TableCell>
              <TableCell>
                {item.isPromised ? (
                  <Badge variant="success">Promised</Badge>
                ) : (
                  <Badge variant="secondary">Available</Badge>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground px-4">
                {item?.promisedBy || "---"}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(item?._id, item?.name)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
