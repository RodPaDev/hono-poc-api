"use client";

import { NavItems, type NavItem } from "@/components/nav-items";
import { NavUser } from "@/components/nav-user";
import { OrgSwitcher, type NavOrg } from "@/components/org-switcher";
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
  Briefcase,
  Command,
  GalleryVerticalEnd,
  Network,
} from "lucide-react";
import * as React from "react";

interface SidebarData {
  user: NavUser;
  orgs: NavOrg[];
  navItems: NavItem[];
}
const data: SidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  orgs: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      id: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      id: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      id: "Free",
    },
  ],
  navItems: [
    {
      title: "My Organization",
      url: "/organizations/:organizationId",
      icon: Briefcase,
      isActive: true,
    },
    {
      title: "All Organizations",
      url: "/organizations",
      icon: Network,
    },
    // {
    //   title: "Orders",
    //   url: "#",
    //   icon: Package,
    // },
    // {
    //   title: "Users",
    //   url: "#",
    //   icon: Users,
    // },
    // {
    //   title: "Analytics",
    //   url: "#",
    //   icon: LineChart,
    // },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onClickLogout: () => void;
}

export function AppSidebar({ onClickLogout, ...props }: AppSidebarProps) {
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
        <NavUser onClickLogout={onClickLogout} user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
