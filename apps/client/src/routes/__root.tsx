import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [{ title: "fsm" }],
  }),

  notFoundComponent: NotFound,
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

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-screen h-screen">
      <h1 className="text-2xl font-bold">{t("common.pageNotFound")}</h1>
      <Link to="/" className="ml-4 text-primary hover:underline">
        {t("common.goToHome")}
      </Link>
    </div>
  );
}
