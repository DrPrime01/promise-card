import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmptyUI from "../empty";

type ListType = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  actions: React.ReactNode;
};

export default function EmptyCard(props: ListType) {
  return (
    <Card className="w-full">
      <CardHeader className="text-center sr-only">
        <CardTitle className="text-4xl font-bold">{props.title}</CardTitle>
        <CardDescription className="text-lg pt-2">
          For {props.desc}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EmptyUI {...props} />
      </CardContent>
    </Card>
  );
}
