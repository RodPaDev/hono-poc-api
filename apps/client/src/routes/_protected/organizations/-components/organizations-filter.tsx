import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { t } from "i18next";
import { Search } from "lucide-react";
import { useState } from "react";

const TABS = {
  All: "all",
  Active: "active",
  Inactive: "inactive",
} as const;
export type TabsType = (typeof TABS)[keyof typeof TABS];

interface Props {
  onFilterChange: (tabType: TabsType, searchValue: string) => void;
}

export const OrganizationsFilter = ({ onFilterChange }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState<TabsType>(TABS.All);

  const handleTabChange = (tabType: TabsType) => {
    setActiveTab(tabType);
    onFilterChange(tabType, searchValue);
  };

  const handleSearchChange = (search: string) => {
    setSearchValue(search);
    onFilterChange(activeTab, search);
  };

  return (
    <div className="flex justify-between pb-6">
      <Tabs
        defaultValue={TABS.All}
        className="w-100"
        onValueChange={(value) => handleTabChange(value as TabsType)}>
        <TabsList className="grid w-full grid-cols-3 bg-[#F5F5F5] rounded-md">
          <TabsTrigger value={TABS.All}>
            {t(`organization.filter.${TABS.All}`)}
          </TabsTrigger>
          <TabsTrigger value={TABS.Active}>
            {t(`organization.filter.${TABS.Active}`)}
          </TabsTrigger>
          <TabsTrigger value={TABS.Inactive}>
            {t(`organization.filter.${TABS.Inactive}`)}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center justify-center border rounded-md">
        <Search className="size-4 mx-3 text-gray-500" />
        <Input
          type="text"
          placeholder={t("organization.filter.search")}
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-0"
        />
      </div>
    </div>
  );
};
