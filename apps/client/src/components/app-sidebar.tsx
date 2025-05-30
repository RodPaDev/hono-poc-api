"use client";

import { NavItems } from "@/components/nav-items";
import { NavUser } from "@/components/nav-user";
import { OrgSwitcher } from "@/components/org-switcher";
import { SidebarTrigger } from "@/components/sidebar-trigger";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import * as React from "react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  orgs: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navItems: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Cart",
      url: "#",
      icon: ShoppingCart,
    },
    {
      title: "Orders",
      url: "#",
      icon: Package,
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
    },
    {
      title: "Analytics",
      url: "#",
      icon: LineChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrgSwitcher orgs={data.orgs} />
      </SidebarHeader>
      <SidebarContent>
        <NavItems items={data.navItems} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
