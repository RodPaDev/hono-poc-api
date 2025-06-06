import type { OrganizationRepository } from "@/repositories/organization.repository";
import { type GetOrganizations } from "@fsm/common";

export class OrganizationService {
  constructor(private readonly repo: OrganizationRepository) {}

  async getAll(filters: GetOrganizations) {
    return this.repo.findAll(filters);
  }
}
