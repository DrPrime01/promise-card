"use client";
import { usePathname } from "next/navigation";

import DashboardLayout from ".";
import { HomeIcon, TableIcon } from "lucide-react";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menu = [
    {
      name: "Dashboard",
      path: "/user",
      icon: <HomeIcon />,
      isActive: pathname === "/user",
    },
    {
      name: "Promise Cards",
      path: "/user/promise-cards",
      icon: <TableIcon />,
      isActive: pathname.includes("/promise-cards"),
    },
  ];
  return (
    <DashboardLayout menu={menu} settingsLink="/user/settings-and-profile">
      {children}
    </DashboardLayout>
  );
}
