import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import CustomTable from ".";
import Link from "next/link";
import { Button } from "../ui/button";

export default function AllCardsTable({
  lists,
}: {
  lists: { title: string; occasion: string; _id: string }[];
}) {
  const tableBody = lists?.map((list, index) => ({
    title: list.title,
    occasion: list.occasion,
    link: "",
    status: "",
    action: (
      <Button variant="outline" asChild>
        <Link href={`/list/${list._id}`}>View List</Link>
      </Button>
    ),
    id: index + 1,
  }));
  return (
    <Card className="w-full gap-0">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">All Your Cards</h2>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <CustomTable tableHead={tableHead} tableBody={tableBody} />
      </CardContent>
    </Card>
  );
}

const tableHead = [
  { id: "id", label: "SN" },
  { id: "title", label: "Title" },
  { id: "occasion", label: "Occasion" },
  { id: "link", label: "Share Link" },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "action",
    label: "",
  },
];
