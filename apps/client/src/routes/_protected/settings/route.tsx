import {
  PanelLayout,
  PanelLayoutContent,
  PanelLayoutHeader,
  PanelLayoutSidebar,
  PanelLayoutSidebarItemLink,
  PanelLayoutSplit,
} from "@/components/layouts/panel-layout";

import { createFileRoute, Outlet } from "@tanstack/react-router";
import { t } from "i18next";
import { Settings } from "lucide-react";

export const Route = createFileRoute("/_protected/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PanelLayout>
      <PanelLayoutHeader>
        <Settings className="w-6 h-6 mr-2 text-foreground" />
        <h1 className="font-semibold text-foreground text-2xl">
          {t("settings.routeTitle")}
        </h1>
      </PanelLayoutHeader>

      <PanelLayoutSplit>
        <PanelLayoutSidebar>
          <PanelLayoutSidebarItemLink to="/settings/profile">
            {t("settings.profile")}
          </PanelLayoutSidebarItemLink>

          <PanelLayoutSidebarItemLink to="/settings/privacy-policy">
            {t("settings.privacyPolicy")}
          </PanelLayoutSidebarItemLink>

          <PanelLayoutSidebarItemLink to="/settings/terms-and-conditions">
            {t("settings.termsAndConditions")}
          </PanelLayoutSidebarItemLink>
        </PanelLayoutSidebar>
        <PanelLayoutContent>
          <Outlet />
        </PanelLayoutContent>
      </PanelLayoutSplit>
    </PanelLayout>
  );
}
