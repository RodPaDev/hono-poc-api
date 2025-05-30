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

import * as React from "react";

export interface SidebarData {
  user: NavUser;
  orgs: NavOrg[];
  navItems: NavItem[];
}


interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onClickLogout: () => void;
  data: SidebarData;
}

export function AppSidebar({ onClickLogout,data , ...props}: AppSidebarProps) {
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
