import type { AccessControlledNavItem } from "@/components/app-sidebar/use-app-sidebar-ac";
import i18next from "i18next";
import { Briefcase, Network } from "lucide-react";

/**
 * Sidebar navigation items with access control.
 *
 * @remarks
 * - `userRolePermissions` refers to permissions assigned to the current user directly,
 *   typically defined at the platform/user level (e.g., platform-wide actions, user management).
 *   These are validated using `authClient.admin.hasPermission`.
 *
 * - `organizationRolePermissions` refers to permissions assigned to the user's role within the current organization.
 *   These are validated using `authClient.organization.hasPermission`.
 *
 * - If both permission types are defined, the item is shown only if **each defined permission check passes**.
 *   (i.e., the user must pass all applicable permission checks.)
 */
export const SIDEBAR_ITEMS: AccessControlledNavItem[] = [
  {
    title: i18next.t("common.myOrganization"),
    url: "/dashboard",
    icon: Briefcase,
    organizationRolePermissions: {
      organization: ["update", "delete"],
    },
  },
  {
    title: i18next.t("common.organizations"),
    url: "/organizations",
    icon: Network,
    userRolePermissions: {
      platform: ["read", "create", "update", "delete"],
    },
  },
];
