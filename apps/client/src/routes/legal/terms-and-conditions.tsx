import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/terms-and-conditions")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Terms and Conditions</div>;
}
