import { getPublicCard } from "@/actions/card/list";
import PromiseCard from "@/components/cards/promise-card";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { list } = await getPublicCard(id);

  return (
    <main className="bg-gray-50 min-h-screen w-full flex justify-center py-12 px-4">
      <PromiseCard {...list} shareableId={id} />
    </main>
  );
}
