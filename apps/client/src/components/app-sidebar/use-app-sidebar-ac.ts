import type { NavItem } from "@/components/app-sidebar/app-sidebar-types";
import { authClient } from "@/lib/auth-client";
import type {
  OrganizationRolePermissions,
  UserRolePermissions,
} from "@fsm/common";
import { useQuery } from "@tanstack/react-query";

/**
 * Permissions required for the current user to view this navigation item.
 *
 * @remarks
 * - `userRolePermissions` apply to the user's global/platform-level roles.
 *   These are evaluated using `authClient.admin.hasPermission`.
 *
 * - `organizationRolePermissions` apply to the user's role within the currently active organization.
 *   These are evaluated using `authClient.organization.hasPermission`.
 *
 * - If both are provided, access is granted only if each defined permission check passes.
 */
export interface AccessControlledNavItem extends NavItem {
  userRolePermissions?: UserRolePermissions;
  organizationRolePermissions?: OrganizationRolePermissions;
}
/**
 * Custom React hook that returns a filtered list of navigation items based on access control.
 * Utilizes React Query's `useQuery` to asynchronously filter the provided navigation items.
 *
 * @param items - An array of `AccessControlledNavItem` objects to be filtered according to access control rules.
 * @returns The result of the `useQuery` call, containing the filtered navigation items and query state.
 *
 * @example
 * const { data: filteredItems } = useAccessControlledSidebar(navItems);
 */
export function useAccessControlledSidebar(items: AccessControlledNavItem[]) {
  return useQuery({
    queryKey: ["access-controlled-sidebar", items],
    queryFn: () => filterNavItems(items),
  });
}

/**
 * Filters an array of access-controlled navigation items asynchronously based on permissions.
 *
 * For each item in the input array, this function checks if the user has permission to access it
 * by calling `checkNavItemPermission`. It waits for all permission checks to complete (using `Promise.allSettled`),
 * then returns a new array containing only the navigation items for which permission was granted.
 *
 * @param items - An array of `AccessControlledNavItem` objects to be filtered based on access control.
 * @returns A promise that resolves to an array of `NavItem` objects for which the user has permission.
 */
async function filterNavItems(
  items: AccessControlledNavItem[],
): Promise<NavItem[]> {
  const promises = items.map((item) => checkNavItemPermission(item));

  const results = await Promise.allSettled(promises);
  return results
    .filter(
      (r): r is PromiseFulfilledResult<NavItem> =>
        r.status === "fulfilled" && r.value !== null,
    )
    .map((r) => r.value);
}

/**
 * Checks if the current user or their organization has permission to access a navigation item.
 *
 * @param item - The navigation item with access control information.
 * @returns A promise that resolves to a `NavItem` object containing the item's title, URL, and icon if the user or organization has permission; otherwise, resolves to `null`.
 *
 * @remarks
 * - If both user and organization permissions are specified, the function grants access if either check passes.
 * - Uses `authClient.admin.hasPermission` for user permissions and `authClient.organization.hasPermission` for organization permissions.
 *
 */
async function checkNavItemPermission(
  item: AccessControlledNavItem,
): Promise<NavItem | null> {
  let hasUserPermission = true;
  let hasOrgPermission = true;

  if (item.userRolePermissions) {
    const result = await authClient.admin.hasPermission({
      permissions: item.userRolePermissions,
    });

    hasUserPermission = result.data?.success ?? false;
  }

  if (item.organizationRolePermissions) {
    const result = await authClient.organization.hasPermission({
      permissions: item.organizationRolePermissions,
    });
    hasOrgPermission = result.data?.success ?? false;
  }

  if (
    (!item.userRolePermissions || hasUserPermission) &&
    (!item.organizationRolePermissions || hasOrgPermission)
  ) {
    const { title, url, icon } = item;
    return { title, url, icon };
  }

  return null;
}
