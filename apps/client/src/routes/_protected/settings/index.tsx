import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/settings/")({
  beforeLoad: async ({ location }) => {
    throw redirect({
      to: "/settings/profile",
      search: location.search,
    });
  },
});
