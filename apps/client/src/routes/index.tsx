import { getSession } from "@/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  // Root route: immediately redirects users to the login page.
  // No UI is rendered here, as this route serves only as a redirect entry point.
  // If you want to display a landing or splash screen before redirecting,
  // you could add a component here.
  beforeLoad: async ({ location }) => {
    const { data } = await getSession();
    if (data?.session) {
      // If the user is already authenticated, redirect them to the protected route.
      // This can be fine-tuned to redirect to a specific page depending on your app's logic.
      // For example, you might want to redirect an admin user to the organization list page,
      // or a regular user to their dashboard.
      throw redirect({
        to: "/dashboard",
        search: location.search,
      });
    }
    throw redirect({
      to: "/login",
      search: location.search,
    });
  },
  notFoundComponent: () => {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <h1 className="text-2xl font-bold">Page Not Found</h1>
      </div>
    );
  },
});
