import type { FileRoutesByTo } from "@/routeTree.gen";
import type { BetterFetchError } from "better-auth/react";
import type { LucideIcon } from "lucide-react";

export interface NavUser {
  name: string;
  email: string;
  avatar?: string;
  userRole: "admin" | "user";
  activeOrgId?: string;
}

export interface NavOrg {
  name: string;
  logo?: string;
  id: string;
}

export interface AsyncOrganizations {
  list: NavOrg[];
  isPending: boolean;
  error: BetterFetchError | null;
}

export interface NavItem {
  title: string;
  to: keyof FileRoutesByTo;
  icon?: LucideIcon;
}

export interface NavItems {
  list: NavItem[];
  isPending: boolean;
  error: Error | null;
}
