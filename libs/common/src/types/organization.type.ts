import z from "zod";

export enum OrganizationStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export type OrganizationMetadata = {
  status: OrganizationStatus;
};

export const GetOrganizationsSchema = z.object({
  search: z.string().optional(),
  status: z.nativeEnum(OrganizationStatus).optional(),
});
export type GetOrganizations = z.infer<typeof GetOrganizationsSchema>;
