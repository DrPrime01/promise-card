import UserDashboardLayout from "@/components/layouts/DashboardLayout/UserDashboardLayout";
import AddItemsInitiator from "@/components/user/AddItemsInitiator";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <UserDashboardLayout>
      <div className="flex flex-col h-full">
        <div className="bg-white flex flex-row justify-between items-center w-full border-b border-[#E4E7EC] py-5 px-10">
          <div>
            <h3 className="font-bold font-aeonik-bold tracking-[-2%] text-black text-xl leading-[120%] mb-1">
              Promise Card
            </h3>
            <p className="text-[#475367] text-base leading-[150%]">
              Here’s your promise cards.
            </p>
          </div>
          <AddItemsInitiator itemID={id} />
        </div>
        <div className="flex-1 px-9 overflow-y-auto min-h-0 py-5 space-y-5"></div>
      </div>
    </UserDashboardLayout>
  );
}
