import PromiseCard from "@/components/cards/promise-card";

async function getListDetails(id: string) {
  // Mock data for demonstration
  return {
    title: "Tola's Christmas Wishlist",
    occasion: "Christmas",
    items: [
      { _id: "1", name: "Rice 10kg", isPromised: false },
      {
        _id: "2",
        name: "AFA Sports Slides",
        isPromised: true,
        promisedBy: "Funke",
      },
      { _id: "3", name: "5k Shopping Voucher", isPromised: false },
      { _id: "4", name: "Infinix Selfie Stick", isPromised: false },
    ],
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const list = await getListDetails(id);
  return (
    <main className="bg-gray-50 min-h-screen w-full flex justify-center py-12 px-4">
      <PromiseCard {...list} />
    </main>
  );
}
