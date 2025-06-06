import type {
  AsyncOrganizations,
  NavItems,
  NavOrg,
  NavUser,
} from "@/components/app-sidebar/app-sidebar-types";
import React, { createContext, useContext } from "react";

export interface SidebarAppContextValue {
  onClickLogout: () => void;
  onClickOrg: (org: NavOrg) => void;
  user: NavUser;
  organizations: AsyncOrganizations;
  navItems: NavItems;
  isNavItemsPending: boolean;
}

const SidebarAppContext = createContext<SidebarAppContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebarAppContext = () => {
  const context = useContext(SidebarAppContext);
  if (!context) {
    throw new Error(
      "useSidebarAppContext must be used within SidebarAppProvider",
    );
  }
  return context;
};

export const SidebarAppProvider = ({
  context,
  children,
}: {
  context: SidebarAppContextValue;
  children: React.ReactNode;
}) => {
  return (
    <SidebarAppContext.Provider value={context}>
      {children}
    </SidebarAppContext.Provider>
  );
};
