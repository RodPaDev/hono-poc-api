import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: () => (
    <div>
      Authentication Page
      <Outlet></Outlet>
    </div>
  ),
  beforeLoad: async ({ location }) => {
    throw redirect({
      to: "/",
      search: location.search,
    });
  },
});
