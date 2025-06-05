import { OrganizationStatus } from "@fsm/common";
import z from "zod";

export const FilterOrganizationsSchema = z.object({
  search: z.string().optional(),
  status: z.nativeEnum(OrganizationStatus).optional(),
});
export type FilterOrganizations = z.infer<typeof FilterOrganizationsSchema>;
