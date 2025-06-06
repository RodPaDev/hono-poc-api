import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SidebarAppProvider } from "@/components/app-sidebar/app-sidebar-context";
import type {
  NavOrg,
  NavUser,
} from "@/components/app-sidebar/app-sidebar-types";

import {
  useAccessControlledSidebar,
  type AccessControlledNavItem,
} from "@/components/app-sidebar/use-app-sidebar-ac";
import AppSplashScreen from "@/components/app-splashscreen";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { authClient, getSession, signOut } from "@/lib/auth-client";
import {
  createFileRoute,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import i18next from "i18next";
import { Briefcase, Network } from "lucide-react";
import { useCallback, useEffect } from "react";

const navItems: AccessControlledNavItem[] = [
  {
    title: i18next.t("common.myOrganization"),
    url: "/dashboard",
    icon: Briefcase,
    permissions: {
      organization: { organization: ["read", "create", "update", "delete"] },
    },
  },
  {
    title: i18next.t("common.organizations"),
    url: "/organizations",
    icon: Network,
    permissions: {
      user: {
        platform: ["read", "create", "update", "delete"],
      },
    },
  },
];

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ location }) => {
    const { data } = await getSession();
    if (!data?.session) {
      throw redirect({
        to: "/login",
        search: location.search,
      });
    }

    return { data };
  },
  loader: async ({ context }) => {
    return {
      user: context.data.user,
      session: context.data.session,
    };
  },
  pendingComponent: AppSplashScreen,
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const loaderData = Route.useLoaderData();
  const {
    data: organizations,
    isPending: isOrganizationsPending,
    error: organizationsError,
  } = authClient.useListOrganizations();

  const {
    data: activeOrganization,
    isPending: isActiveOrganizationPending,
    refetch: refetchActiveOrganization,
  } = authClient.useActiveOrganization();

  const {
    data: sidebarItems,
    isPending: isAcSidebarPending,
    error: sidebarError,
  } = useAccessControlledSidebar(navItems);

  const setActiveOrg = useCallback(
    async (organizationId: string) => {
      await authClient.organization.setActive({ organizationId });
      refetchActiveOrganization();
    },
    [refetchActiveOrganization],
  );

  useEffect(() => {
    if (
      !isActiveOrganizationPending &&
      !isOrganizationsPending &&
      !activeOrganization &&
      organizations &&
      organizations.length > 0
    ) {
      setActiveOrg(organizations[0].id);
    }
  }, [
    isActiveOrganizationPending,
    isOrganizationsPending,
    activeOrganization,
    organizations,
    setActiveOrg,
  ]);

  const handleLogout = async () => {
    await signOut();
    await router.invalidate();
  };

  const orgs = organizations?.map((org) => ({
    id: org.id,
    name: org.name,
    logo: org.logo || undefined,
  }));

  const user: NavUser = {
    name: loaderData.user.name,
    email: loaderData.user.email,
    avatar: loaderData.user.image || "",
    activeOrgId: activeOrganization?.id || "",
    userRole: loaderData.user.role as "admin" | "user",
  };

  const handleClickOrg = async (org: NavOrg) => {
    if (org.id !== user.activeOrgId) {
      await setActiveOrg(org.id);
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <SidebarAppProvider
        context={{
          onClickLogout: handleLogout,
          onClickOrg: handleClickOrg,
          user,
          organizations: {
            list: orgs || [],
            isPending: isOrganizationsPending,
            error: organizationsError,
          },
          navItems: {
            list: sidebarItems || [],
            isPending: isAcSidebarPending,
            error: sidebarError,
          },
        }}>
        <AppSidebar />
      </SidebarAppProvider>
      <SidebarInset>
        <main className="flex h-full flex-1 flex-col overflow-hidden">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
