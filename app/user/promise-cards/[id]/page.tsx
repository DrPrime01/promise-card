import { getUserList } from "@/actions/user/list";
import BackBtn from "@/components/buttons/back-btn";
import EmptyCard from "@/components/cards/empty-card";
import UserDashboardLayout from "@/components/layouts/DashboardLayout/UserDashboardLayout";
import { OwnerItemsTable } from "@/components/tables/OwnerItemsTable";
import AddItemsInitiator from "@/components/user/AddItemsInitiator";
import StatsCard from "@/components/user/StatsCard";
import { FileX2 } from "lucide-react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { list } = await getUserList(id);
  const items = list?.items;

  return (
    <UserDashboardLayout>
      <div className="flex flex-col h-full">
        <div className="bg-white flex flex-row justify-between items-center w-full border-b border-[#E4E7EC] py-5 px-10">
          <div className="flex gap-x-3 items-start">
            <BackBtn />
            <div>
              <h3 className="font-bold font-aeonik-bold tracking-[-2%] text-black text-xl leading-[120%] mb-1">
                {list?.title} Promise Card
              </h3>
              <p className="text-[#475367] text-base leading-[150%]">
                Here’s your promise card.
              </p>
            </div>
          </div>
          {items.length > 0 && <AddItemsInitiator itemID={id} />}
        </div>
        <div className="flex-1 px-9 overflow-y-auto min-h-0 py-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatsCard value={items?.length} label="Items" />
            <StatsCard value="80" label="Promises Fulfilled" />
            <StatsCard value="40" label="Promises Awaiting" />
          </div>
          <div>
            {items.length > 0 ? (
              <OwnerItemsTable items={items} />
            ) : (
              <EmptyCard
                icon={<FileX2 />}
                title="No Items in this Card"
                desc="You haven't added an item to this card. Click the button below to start adding"
                actions={<AddItemsInitiator itemID={id} />}
              />
            )}
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
}
