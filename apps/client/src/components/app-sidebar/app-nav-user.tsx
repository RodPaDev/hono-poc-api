import { useSidebarAppContext } from "@/components/app-sidebar/app-sidebar-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import { formatInitials } from "@/utils/formatting";
import { Link } from "@tanstack/react-router";

import { EllipsisVertical, LogOut, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

export function NavUser() {
  const { organizations, user, onClickOrg, onClickLogout } =
    useSidebarAppContext();
  const { t } = useTranslation();
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {formatInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          {/* 
              DropdownMenuContent is used to display the dropdown menu when the user clicks on the user avatar.
              It contains the list of organizations, profile settings, and logout option.
              These are not entirely configurable, per project it's better to just edit the code here
            */}
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "top"}
            align="end"
            sideOffset={4}>
            {organizations.isPending && !organizations.error && (
              <Fragment>
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-muted-foreground text-xs flex gap-2">
                    {t("common.organizations")}
                    <div className="h-3 w-3 animate-spin rounded-full border-1 border-muted-foreground border-t-transparent" />
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </DropdownMenuGroup>
              </Fragment>
            )}
            {!organizations.isPending &&
              !organizations.error &&
              organizations.list.length > 0 && (
                <Fragment>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-muted-foreground text-xs">
                      {t("common.organizations")}
                    </DropdownMenuLabel>

                    <DropdownMenuLabel className="flex flex-col gap-1 p-0 font-normal">
                      {organizations.list.map((org) => (
                        <SidebarMenuButton
                          key={org.name}
                          onClick={() => onClickOrg(org)}
                          className={cn(
                            "gap-2 p-2 h-10 border border-transparent",
                            org.id === user.activeOrgId &&
                              "bg-sidebar-accent text-sidebar-primary border border-border",
                          )}>
                          <Avatar className="h-8 w-8 rounded-full">
                            <AvatarImage src={org.logo} alt={org.name} />
                            <AvatarFallback
                              className={cn(
                                "rounded-full border border-border",
                                org.id === user.activeOrgId &&
                                  "bg-sidebar-accent",
                              )}>
                              {formatInitials(org.name)}
                            </AvatarFallback>
                          </Avatar>

                          {org.name}
                        </SidebarMenuButton>
                      ))}
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </Fragment>
              )}

            <DropdownMenuGroup>
              <Link to="/settings" className="w-full">
                <DropdownMenuItem>
                  <Settings />
                  {t("common.settings")}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onClickLogout}>
              <LogOut />
              {t("common.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
