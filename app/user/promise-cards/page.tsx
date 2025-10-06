import { getUserLists } from "@/actions/user/list";
import UserDashboardLayout from "@/components/layouts/DashboardLayout/UserDashboardLayout";
import AllCardsTable from "@/components/tables/AllCardsTable";
import CreateNewCardInitiator from "@/components/user/CreateNewCardInitiator";
import StatsCard from "@/components/user/StatsCard";

export default async function page() {
  const data = await getUserLists();

  return (
    <UserDashboardLayout>
      <div className="flex flex-col h-full">
        <div className="bg-white flex flex-row justify-between items-center w-full border-b border-[#E4E7EC] py-5 px-5 md:px-10">
          <div>
            <h3 className="font-bold font-aeonik-bold tracking-[-2%] text-black text-base md:text-xl leading-[120%] mb-1">
              Your Promise Cards
            </h3>
            <p className="text-[#475367] text-xs md:text-base leading-[150%]">
              Here’s a quick overview of your cards.
            </p>
          </div>
          {data?.lists?.length > 0 && <CreateNewCardInitiator />}
        </div>
        <div className="flex-1 px-9 overflow-y-auto min-h-0 py-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatsCard value="120" label="Promises in Total" />
            <StatsCard value="80" label="Promises Fulfilled" />
            <StatsCard value="40" label="Promises Awaiting" />
          </div>
          <div>
            <AllCardsTable lists={data?.lists} />
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
}
