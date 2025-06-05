import { Button } from "@/components/ui/button";
import {
  OrganizationsFilter,
  type TabsType,
} from "@/routes/_protected/organizations/-components/organizations-filter";
import { OrganizationsList } from "@/routes/_protected/organizations/-components/organizations-list";
import { OrganizationStatus } from "@fsm/common";
import { createFileRoute } from "@tanstack/react-router";
import { t } from "i18next";
import { Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_protected/organizations/")({
  component: OrganizationsPage,
});

function OrganizationsPage() {
  const [isOpened, setIsOpened] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabsType>("all");

  const getStatusFilter = (tab: TabsType): OrganizationStatus | undefined => {
    if (tab === "active") return OrganizationStatus.ACTIVE;
    if (tab === "inactive") return OrganizationStatus.INACTIVE;
    return undefined;
  };

  return (
    <div className="px-4 pt-10">
      <div className="flex items-center justify-between mb-4">
        <p className="text-2xl font-semibold">
          {t("organization.allOrganizations")}
        </p>
        <Button>
          <Plus />
          {t("organization.createOrganization")}
        </Button>
      </div>
      <OrganizationsFilter
        activeTab={activeTab}
        onTabChange={setActiveTab}
        search={search}
        onSearchChange={setSearch}
      />
      <OrganizationsList
        filters={{ search, status: getStatusFilter(activeTab) }}
      />
    </div>
  );
}
