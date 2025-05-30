import { useSidebar } from "@/components/ui/sidebar";

interface Props {
  Icon: React.ElementType;
}

export function SidebarTrigger({ Icon }: Props) {
  const { toggleSidebar } = useSidebar();

  return (
    <button className="flex justify-end" onClick={toggleSidebar}>
      <Icon />
    </button>
  );
}
