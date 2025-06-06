import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { FileRoutesByTo } from "@/routeTree.gen";
import { Link, useRouterState } from "@tanstack/react-router";
import * as React from "react";

export function PanelLayout({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col h-screen bg-muted/40", className)}
      {...props}
    />
  );
}

export function PanelLayoutHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "shrink-0 bg-background border-b border-border flex items-center p-6",
        className,
      )}
      {...props}>
      {children}
    </div>
  );
}

export function PanelLayoutSplit({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-1 min-h-0 w-full gap-4 p-4", className)}
      {...props}
    />
  );
}

export function PanelLayoutSidebar({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  /* To update the width of the sidebar,you need to change "w-48" to your desired width in both the ScrollArea and the ul element. */
  return (
    <ScrollArea className="h-full w-48 shrink-0">
      <ul className={cn("w-48 flex flex-col gap-2", className)} {...props}>
        {children}
      </ul>
    </ScrollArea>
  );
}

export function PanelLayoutSidebarItem({
  className,
  active,
  ...props
}: React.HTMLAttributes<HTMLLIElement> & { active?: boolean }) {
  return (
    <li
      className={cn(
        "rounded-md hover:bg-accent hover:text-accent-foreground",
        active && "bg-sidebar-accent",
        className,
      )}
      {...props}>
      <div className="px-4 py-2 truncate overflow-hidden whitespace-nowrap">
        {props.children}
      </div>
    </li>
  );
}

export function PanelLayoutSidebarItemLink({
  className,
  to,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: keyof FileRoutesByTo;
  children: React.ReactNode;
}) {
  const location = useRouterState({ select: (s) => s.location });

  return (
    <Link to={to} {...props}>
      <PanelLayoutSidebarItem
        active={location.pathname === to}
        className={className}>
        {children}
      </PanelLayoutSidebarItem>
    </Link>
  );
}

export function PanelLayoutContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <ScrollArea className="flex-1 h-full w-full">
      <div className={cn("p-4", className)} {...props}>
        {children}
      </div>
    </ScrollArea>
  );
}
