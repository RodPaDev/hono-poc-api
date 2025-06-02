import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Fragment } from "react/jsx-runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [{ title: "fsm" }],
  }),
  component: () => {
    return (
      <Fragment>
        <HeadContent />
        <div className="w-screen h-screen">
          <Outlet />
        </div>
        <TanStackRouterDevtools position="bottom-right" />
      </Fragment>
    );
  },
});
