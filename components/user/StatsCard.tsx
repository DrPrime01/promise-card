import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function StatsCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <Card>
      <CardHeader className="sr-only">
        <CardTitle>Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-3">
          <span className="text-4xl lg:text-6xl font-semibold">{value}</span>
          <p className="text-sm md:text-base lg:text-lg text-gray-700">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
