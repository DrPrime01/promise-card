"use client";

import { AppSidebar } from "@/components/sidebars/AppSidebar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";

export default function DashboardLayout({
  children,
  menu,
  settingsLink,
  homeLink = "/",
}: {
  children: React.ReactNode;
  menu: MenuProps[];
  settingsLink?: string;
  homeLink?: string;
}) {
  return (
    <SidebarProvider>
      <AppSidebar homeLink={homeLink} menu={menu} settingsLink={settingsLink} />
      <SidebarInset className="flex flex-col h-svh overflow-y-hidden">
        <header className="h-16 border-b border-[#E4E7EC] flex items-center justify-end shrink-0 gap-3 px-10">
          <button className="size-10 bg-[#F0F2F5] rounded-full flex items-center justify-center">
            <Bell size={20} />
          </button>
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
        </header>
        <main className="flex-1 overflow-y-hidden overflow-x-hidden bg-[#FAFAFA]">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
