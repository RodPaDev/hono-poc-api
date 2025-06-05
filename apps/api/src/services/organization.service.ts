import type { OrganizationRepository } from "@/repositories/organization.repository";
import { type FilterOrganizations } from "@/types/organization.types";

export class OrganizationService {
  constructor(private readonly repo: OrganizationRepository) {}

  async getAll(filters: FilterOrganizations) {
    return this.repo.findAll(filters);
  }
}
