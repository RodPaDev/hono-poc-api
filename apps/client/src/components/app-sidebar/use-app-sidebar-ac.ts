import type { NavItem } from "@/components/app-sidebar/app-sidebar-types";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

export interface AccessControlledNavItem extends NavItem {
  permissions: {
    user?: Record<string, string[]> | null;
    organization?: Record<string, string[]> | null;
  };
}

export function useAccessControlledSidebar(items: AccessControlledNavItem[]) {
  return useQuery({
    queryKey: ["access-controlled-sidebar", items],
    queryFn: () => filterNavItems(items),
  });
}
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

async function checkNavItemPermission(
  item: AccessControlledNavItem,
): Promise<NavItem | null> {
  let hasUserPermission = true;
  let hasOrgPermission = true;

  if (item.permissions?.user) {
    const result = await authClient.admin.hasPermission({
      permissions: item.permissions.user ?? {},
    });
    hasUserPermission = result.data?.success ?? false;
  }

  if (item.permissions?.organization) {
    const result = await authClient.organization.hasPermission({
      permissions: item.permissions.organization ?? {},
    });
    hasOrgPermission = result.data?.success ?? false;
  }

  if (hasUserPermission || hasOrgPermission) {
    const { title, url, icon } = item;
    return { title, url, icon };
  }

  return null;
}
