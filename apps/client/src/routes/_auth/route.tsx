import { getSession } from "@/lib/auth-client";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const { data } = await getSession();
    if (data?.session) {
      throw redirect({
        to: "/",
        search: location.search,
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
