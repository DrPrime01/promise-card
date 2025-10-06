import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PromiseCardTable } from "../tables/PromiseCardTable.tsx";

type ListType = {
  title: string;
  occasion: string;
  items: {
    _id: string;
    name: string;
    isPromised: boolean;
    promisedBy?: string;
  }[];
};

export default function PromiseCard({ title, occasion, items }: ListType) {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold">{title}</CardTitle>
        <CardDescription className="text-lg pt-2">
          For {occasion}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm text-gray-600 mb-6">
          See something you&apos;d like to give? Tick the box, enter your name,
          and make a promise!
        </p>
        <PromiseCardTable items={items} />
      </CardContent>
    </Card>
  );
}
