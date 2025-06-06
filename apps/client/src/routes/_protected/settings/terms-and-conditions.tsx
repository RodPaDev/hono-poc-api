import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/settings/terms-and-conditions",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/settings/terms-and-conditions"</div>;
}
