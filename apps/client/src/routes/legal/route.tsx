import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

export const Route = createFileRoute("/legal")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Fragment>
      <h1 className="text-2xl">Legal</h1>
      <Outlet />
    </Fragment>
  );
}
