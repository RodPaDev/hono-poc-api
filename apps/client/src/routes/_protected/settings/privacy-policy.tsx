import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/settings/privacy-policy")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/settings/privacy-policy"</div>;
}
