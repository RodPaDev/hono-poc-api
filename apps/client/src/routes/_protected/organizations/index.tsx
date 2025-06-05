import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { AddOrganization } from "@/routes/_protected/organizations/-components/add-organization";
import {
  OrganizationsFilter,
  type TabsType,
} from "@/routes/_protected/organizations/-components/organizations-filter";
import { OrganizationsList } from "@/routes/_protected/organizations/-components/organizations-list";
import { createFileRoute } from "@tanstack/react-router";
import { t } from "i18next";
import { Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_protected/organizations/")({
  component: OrganizationsPage,
});

function OrganizationsPage() {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenChange = (type: TabsType, searchValue: string) => {
    console.log("Filter changed to:", type);
    console.log("Search changed to:", searchValue);
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
      <OrganizationsFilter onFilterChange={handleOpenChange} />
      <OrganizationsList />
      {/* <div>Hello "/_protected/organizations/"!</div>;
      <Sheet open={isOpened} onOpenChange={setIsOpened}>
        <AddOrganization />
      </Sheet>
      <div>
        <Button onClick={() => setIsOpened((state) => !state)}>
          Create Organization
        </Button>
      </div> */}
    </div>
  );
}
