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
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import type { BetterFetchError } from "better-auth/react";

import { EllipsisVertical, LogOut, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

export interface NavUser {
  name: string;
  email: string;
  avatar?: string;
  userRole: "admin" | "user";
  activeOrgId?: string;
}

export interface NavOrg {
  name: string;
  logo?: string;
  id: string;
}

export interface AsyncOrganizations {
  list: NavOrg[];
  isPending: boolean;
  error: BetterFetchError | null;
}

interface Props {
  user: NavUser;
  organizations: AsyncOrganizations;
  onClickOrg: (org: NavOrg) => void;
  onClickLogout: () => void;
}

export function NavUser({
  organizations,
  user,
  onClickOrg,
  onClickLogout,
}: Props) {
  const { t } = useTranslation();
  const { isMobile } = useSidebar();

  const getInitials = (name: string) => {
    const names = name.split(" ");
    const firstInitial = names[0] ? names[0][0].toUpperCase() : "";
    const lastInitial = names[names.length - 1]
      ? names[names.length - 1][0].toUpperCase()
      : "";
    return `${firstInitial}${lastInitial}`;
  };

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
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "top"}
            align="end"
            sideOffset={4}>
            {organizations.isPending && !organizations.error && (
              <Fragment>
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-muted-foreground text-xs">
                    {t("common.organizations")}
                    <Spinner
                      size="sm"
                      className="mt-1 bg-sidebar-accent-foreground"
                    />
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
                              {getInitials(org.name)}
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
              <DropdownMenuItem>
                <Settings />
                {t("common.profileSettings")}
              </DropdownMenuItem>
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
