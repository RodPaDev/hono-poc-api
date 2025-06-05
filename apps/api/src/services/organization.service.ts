import type { OrganizationSelect } from "@/models";
import type { IOrganizationRepository } from "@/repositories/organization.repository";

export class OrganizationService {
  constructor(private readonly repo: IOrganizationRepository) {}

  async getAll(): Promise<(OrganizationSelect & { userCount: number })[]> {
    return this.repo.findAll();
  }
}
