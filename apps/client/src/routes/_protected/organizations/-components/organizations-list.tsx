import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOrganizations } from "@/lib/api/queries/organization";
import { cn } from "@/lib/utils";
import {
  parseOrganizationMetadata,
  type OrganizationStatus,
} from "@fsm/common";
import { t } from "i18next";
import { ArrowRight, Inbox } from "lucide-react";

interface OrganizationRowProps {
  image: string | null;
  name: string;
  person: string;
  email: string;
  status: OrganizationStatus | "";
  users: number;
}

const OrganizationRow = ({ data }: { data: OrganizationRowProps }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <Avatar className="size-10">
            <AvatarImage src={data.image || ""} alt="@shadcn" />
            <AvatarFallback>{data.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          {data.name}
        </div>
      </TableCell>
      <TableCell>{data.person}</TableCell>
      <TableCell>{data.email}</TableCell>
      <TableCell>
        <Badge
          className={cn(
            "min-w-[80px] text-center inline-block",
            data.status?.toLowerCase() === "active"
              ? "bg-green-600"
              : "bg-red-600",
          )}>
          {data.status.charAt(0).toUpperCase() +
            data.status.slice(1).toLowerCase()}
        </Badge>
      </TableCell>
      <TableCell>{data.users}</TableCell>
      <TableCell>
        <ArrowRight className="size-4" />
      </TableCell>
    </TableRow>
  );
};

interface OrganizationsListProps {
  filters: {
    search?: string;
    status?: OrganizationStatus;
  };
}

export const OrganizationsList = ({ filters }: OrganizationsListProps) => {
  const { data: organizations } = useGetOrganizations(filters);
  const hasOrganizations = organizations && organizations.length > 0;

  return (
    <>
      {hasOrganizations ? (
        // Organizations List
        <div className="px-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("organization.name")}</TableHead>
                <TableHead>{t("organization.personOfContact")}</TableHead>
                <TableHead>{t("organization.emailOfContact")}</TableHead>
                <TableHead>{t("organization.status")}</TableHead>
                <TableHead>{t("organization.totalUsers")}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((org) => {
                const orgMetadata = parseOrganizationMetadata(org.metadata);
                return (
                  <OrganizationRow
                    key={org.id}
                    data={{
                      image: org.logo,
                      name: org.name,
                      person: "-",
                      email: "-",
                      status: orgMetadata?.status || "",
                      users: org.userCount || 0,
                    }}
                  />
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        // No Organizations
        <div className="items-center justify-center flex flex-col border border-dashed p-4 rounded-lg">
          <div className="p-3 border border-[#E5E5E5] w-fit rounded-lg">
            <Inbox className="size-5" />
          </div>
          <p className="text-2xl font-semibold mt-5">
            {t("organization.noOrganizationsTitle")}
          </p>
          <p className="text-[#737373] mt-2">
            {t("organization.noOrganizationsSubtitle")}
          </p>
        </div>
      )}
    </>
  );
};
