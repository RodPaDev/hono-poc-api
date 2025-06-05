import { NavItems, type NavItem } from "@/components/nav-items";
import {
  NavUser,
  type AsyncOrganizations,
  type NavOrg,
} from "@/components/nav-user";
import { IntusLogo } from "@/components/svgr/IntusLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import * as React from "react";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onClickLogout: () => void;
  onClickOrg: (org: NavOrg) => void;
  user: NavUser;
  organizations: AsyncOrganizations;
  navItems: NavItem[];
}

export function AppSidebar({
  onClickOrg,
  onClickLogout,
  user,
  organizations,
  navItems,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar className="h-screen" collapsible="none" {...props}>
      <SidebarHeader>
        <IntusLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavItems items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          onClickLogout={onClickLogout}
          onClickOrg={onClickOrg}
          organizations={organizations}
          user={user}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
