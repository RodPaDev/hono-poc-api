import { AppSidebar } from "@/components/app-sidebar";
import type { NavItem } from "@/components/nav-items";
import type { NavOrg, NavUser } from "@/components/nav-user";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authClient, getSession, signOut } from "@/lib/auth-client";
import {
  createFileRoute,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import i18next from "i18next";
import { Briefcase, GalleryVerticalEnd, Network } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

const navItems: NavItem[] = [
  {
    title: i18next.t("common.myOrganization"),
    url: "/dashboard",
    icon: Briefcase,
    isActive: true,
  },
  {
    title: i18next.t("common.organizations"),
    url: "/organizations",
    icon: Network,
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
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const loaderData = Route.useLoaderData();
  const {
    data: organizations,
    isPending,
    error,
  } = authClient.useListOrganizations();
  const { t } = useTranslation(); // not passing any namespace will use the defaultNS (by default set to 'translation')

  const handleLogout = async () => {
    await signOut();
    await router.invalidate();
  };

  const orgs =
    organizations?.map((org) => ({
      id: org.id,
      name: org.name,
      logo: org.logo
        ? () => (
            <img
              src={org.logo ?? undefined}
              alt={org.name ?? ""}
              className="h-6 w-6"
            />
          )
        : GalleryVerticalEnd,
    })) ?? [];

  const user: NavUser = {
    name: loaderData.user.name,
    email: loaderData.user.email,
    avatar: loaderData.user.image || "",
    activeOrgId: loaderData.session.activeOrganizationId ?? undefined,
    userRole: loaderData.user.role as "admin" | "user",
  };

  const handleClickOrg = (org: NavOrg) => {
    // Handle organization click logic here
    console.log("Organization clicked:", org);
  };

  return (
    <Fragment>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar
          navItems={navItems}
          user={user}
          organizations={{
            list: orgs,
            isPending,
            error,
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
