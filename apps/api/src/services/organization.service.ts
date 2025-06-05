import type { OrganizationSelect } from "@/models";
import type { IOrganizationRepository } from "@/repositories/organization.repository";
import { type FilterOrganizations } from "@/types/organization.types";

export class OrganizationService {
  constructor(private readonly repo: IOrganizationRepository) {}

  async getAll(
    filters: FilterOrganizations,
  ): Promise<(OrganizationSelect & { userCount: number })[]> {
    return this.repo.findAll(filters);
  }
}
