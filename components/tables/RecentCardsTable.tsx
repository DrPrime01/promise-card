import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChevronRight } from "lucide-react";
import CustomTable from ".";
import Link from "next/link";
import { Button } from "../ui/button";
import ShareLinkInitiator from "../user/ShareLinkInitiator";
import { Badge } from "../ui/badge";

export default function RecentCardsTable({
  lists,
  linkToCards = "/user/promise-cards",
}: {
  lists: {
    title: string;
    occasion: string;
    _id: string;
    active: boolean;
    shareableId: string;
  }[];
  linkToCards?: string;
}) {
  const tableBody = lists?.map((list, index) => ({
    title: list.title,
    occasion: list.occasion,
    link: <ShareLinkInitiator linkId={list.shareableId} />,
    status: list.active ? (
      <Badge className="bg-blue-500 text-white dark:bg-blue-600">
        <span className="bg-green-400 size-2 inline-block rounded-full" />
        Active
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-300">
        Inactive
      </Badge>
    ),
    action: (
      <Button variant="outline" asChild>
        <Link href={`/user/promise-cards/${list._id}`}>View List</Link>
      </Button>
    ),
    id: index + 1,
  }));
  return (
    <Card className="w-full gap-0">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Cards</h2>
            <Link
              href={linkToCards}
              className="text-sm font-medium leading-[145%] shrink-0 flex items-center"
            >
              View all <ChevronRight className="ml-1 size-4" />
            </Link>
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
