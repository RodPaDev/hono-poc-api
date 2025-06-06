import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useRouterState } from "@tanstack/react-router";
import { type LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
}

export interface NavItems {
  list: NavItem[];
  isPending: boolean;
  error: Error | null;
}

interface Props {
  navItems: NavItems;
}

export function NavItems({ navItems }: Props) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {navItems.isPending ? (
          <div className="flex flex-col gap-2">
            <SidebarMenuSkeleton count={4} />
          </div>
        ) : (
          navItems.list.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarNavItem item={item} />
            </SidebarMenuItem>
          ))
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function SidebarNavItem({ item }: { item: NavItem }) {
  const location = useRouterState({ select: (s) => s.location });
  return (
    <Link to={item.url}>
      <SidebarMenuButton
        isActive={location.pathname === item.url}
        tooltip={item.title}>
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </SidebarMenuButton>
    </Link>
  );
}

function SidebarMenuSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuButton>
            <Skeleton className="h-8 w-full bg-border" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}
