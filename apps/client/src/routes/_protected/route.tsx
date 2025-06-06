import { AppSidebar } from "@/components/app-sidebar";
import AppSplashScreen from "@/components/app-splashscreen";
import type { NavOrg, NavUser } from "@/components/nav-user";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  useAccessControlledSidebar,
  type AccessControlledNavItem,
} from "@/hooks/use-ac-sidebar";
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
import { Fragment } from "react/jsx-runtime";

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
    // simulate a delay for loading
    await new Promise((resolve) => setTimeout(resolve, 10000000));
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
      // If no active organization is set, set the first organization as active
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
    <Fragment>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar
          isNavItemsPending={isAcSidebarPending}
          navItems={{
            list: sidebarItems || [],
            isPending: isAcSidebarPending,
            error: sidebarError,
          }}
          user={user}
          organizations={{
            list: orgs || [],
            isPending: isOrganizationsPending,
            error: organizationsError,
          }}
          onClickOrg={handleClickOrg}
          onClickLogout={handleLogout}
        />
        <SidebarInset>
          <main className="flex h-full flex-1 flex-col overflow-hidden">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </Fragment>
  );
}
