import { AppSidebar, type SidebarData } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession, signOut } from "@/lib/auth-client";
import {
  createFileRoute,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { t } from "i18next";
import {
  AudioWaveform,
  Briefcase,
  Command,
  GalleryVerticalEnd,
  Network,
} from "lucide-react";
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
      title: t("common.myOrganization"),
      url: "/dashboard",
      icon: Briefcase,
      isActive: true,
    },
    {
      title: t("common.allOrganizations"),
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

  const handleLogout = async () => {
    await signOut();
    await router.invalidate();
  };

  return (
    <Fragment>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar data={data} onClickLogout={handleLogout} />
        <SidebarInset>
          <main className="flex h-full flex-1 flex-col overflow-hidden">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </Fragment>
  );
}
