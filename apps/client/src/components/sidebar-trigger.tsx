import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";

export function SidebarTrigger() {
  const { toggleSidebar, state } = useSidebar();
  const isOpened = state === "expanded";
  const title = isOpened ? "Close Sidebar" : "Open Sidebar";

  return (
    <button onClick={toggleSidebar}>
      <SidebarMenuButton tooltip={title}>
        {isOpened ? <ArrowLeftToLine /> : <ArrowRightToLine />}
        {isOpened && <span>{title}</span>}
      </SidebarMenuButton>
    </button>
  );
}
