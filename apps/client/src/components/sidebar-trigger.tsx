import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
import { useTranslation } from "react-i18next";

export function SidebarTrigger() {
  const { toggleSidebar, state } = useSidebar();
  const { t } = useTranslation();
  const isOpened = state === "expanded";
  const title = isOpened ? t("common.sidebar.close") : t("common.sidebar.open");

  return (
    <SidebarMenuButton onClick={toggleSidebar} tooltip={title}>
      {isOpened ? <ArrowLeftToLine /> : <ArrowRightToLine />}
      {isOpened && <span>{title}</span>}
    </SidebarMenuButton>
  );
}
