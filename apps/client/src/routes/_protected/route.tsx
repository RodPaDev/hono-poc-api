import { AppSidebar, type SidebarData } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession, signOut } from "@/lib/auth-client";
import {
  createFileRoute,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import i18next from "i18next";
import {
  AudioWaveform,
  Briefcase,
  Command,
  GalleryVerticalEnd,
  Network,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

const data: SidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  orgs: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      id: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      id: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      id: "Free",
    },
  ],
  navItems: [
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
  ],
};

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ location }) => {
    const { data } = await getSession();
    if (!data?.session) {
      throw redirect({
        to: "/login",
        search: location.search,
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const { t } = useTranslation(); // not passing any namespace will use the defaultNS (by default set to 'translation')

  const handleLogout = async () => {
    await signOut();
    await router.invalidate();
  };

  return (
    <Fragment>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar data={data} onClickLogout={handleLogout} />
        <SidebarInset>
          <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">{t("allInbox")}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{t("Inbox")}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className="flex h-full flex-1 flex-col overflow-hidden">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </Fragment>
  );
}
