"use client";

import React from "react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Avatar, AvatarImage } from "../ui/avatar";

import { LogOut, SettingsIcon } from "lucide-react";
import { useUserStore } from "@/store/user-store";

interface AppSidebarProps {
  menu: MenuProps[];
  settingsLink?: string;
  homeLink?: string;
  props?: React.ComponentProps<typeof Sidebar>;
}

export function AppSidebar({
  menu,
  settingsLink,
  homeLink,
  ...props
}: AppSidebarProps) {
  const user = useUserStore((state) => state.getUser());

  return (
    <Sidebar
      // collapsible="none"
      {...props}
      className="bg-white h-screen border-[#E4E7EC] border-r pt-3 pb-11"
    >
      <SidebarHeader className="pl-7 mb-12">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href={homeLink!}>
              <span className="text-2xl font-semibold">Promise Card</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-5 py-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-y-2">
              {menu.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link
                      href={item.path}
                      className="flex items-center gap-x-2 rounded-lg"
                    >
                      {item.icon} <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-y-[22px]">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href={settingsLink || "/settings-and-profile"}
                    className="flex items-center gap-x-2"
                  >
                    <SettingsIcon /> <span>Settings & Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="flex items-center h-auto gap-x-[23px]"
                  //   onClick={logoutDispatcher}
                >
                  <div className="flex-1 flex items-center gap-x-3">
                    <Avatar className="size-10">
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-grey-900 text-sm font-semibold leading-[145%] capitalize">
                        {user?.username}
                      </p>
                      <p className="text-grey-600 text-sm leading-[145%] max-w-20 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <LogOut />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
