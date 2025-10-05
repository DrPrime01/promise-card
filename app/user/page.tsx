"use client";
import UserDashboardLayout from "@/components/layouts/DashboardLayout/UserDashboardLayout";
import CreateNewCard from "@/components/modals/CreateNewCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function User() {
  const [openCardModal, setOpenCardModal] = useState(false);
  return (
    <UserDashboardLayout>
      <div className="flex flex-col h-full">
        <div className="bg-white flex flex-row justify-between items-center w-full border-b border-[#E4E7EC] py-5 px-10">
          <div>
            <h3 className="font-bold font-aeonik-bold tracking-[-2%] text-black text-xl leading-[120%] mb-1">
              Welcome to your Promise Cards dashboard
            </h3>
            <p className="text-[#475367] text-base leading-[150%]">
              Here’s a quick overview of your occasions and cards.
            </p>
          </div>

          <Button
            variant="default"
            type="button"
            onClick={() => setOpenCardModal(true)}
            className="rounded-[100px] h-11 cursor-pointer p-3 text-white text-sm font-medium leading-[145%]"
          >
            <Plus size={20} />
            Create Promise Card
          </Button>
        </div>
        <div className="flex-1 px-9 overflow-y-auto min-h-0 py-5 space-y-5"></div>
      </div>
      <CreateNewCard
        open={openCardModal}
        close={() => setOpenCardModal(false)}
      />
    </UserDashboardLayout>
  );
}
