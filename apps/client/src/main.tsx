import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";

import { routeTree } from "@/routeTree.gen";

import "@/index.css";
import { createRoot } from "react-dom/client";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
