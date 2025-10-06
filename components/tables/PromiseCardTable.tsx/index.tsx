import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PromiseItemRow from "./PromiseItemRow";

type Item = {
  _id: string;
  name: string;
  isPromised: boolean;
  promisedBy?: string;
};

interface PromiseCardTableProps {
  items: Item[];
  shareableId: string;
}

export function PromiseCardTable({
  items,
  shareableId,
}: PromiseCardTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12 text-center">No.</TableHead>
          <TableHead>Gift</TableHead>
          <TableHead className="text-center">Tick</TableHead>
          <TableHead>Giver</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <PromiseItemRow
            key={item._id}
            item={item}
            index={index}
            shareableId={shareableId}
          />
        ))}
      </TableBody>
    </Table>
  );
}
