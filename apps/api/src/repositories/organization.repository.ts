import * as schema from "@/models";
import { type FilterOrganizations } from "@/types/organization.types";
import { parseOrganizationMetadata } from "@fsm/common";
import { asc, ilike, sql } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

export class OrganizationRepository {
  constructor(private readonly db: NodePgDatabase<typeof schema>) {}

  async findAll(filters: FilterOrganizations) {
    // Get user counts per organization
    const userCounts = await this.db
      .select({
        organizationId: schema.member.organizationId,
        count: sql<number>`count(${schema.member.userId})::int`,
      })
      .from(schema.member)
      .groupBy(schema.member.organizationId);
    const countMap = new Map<string, number>();
    userCounts.forEach((count) => {
      countMap.set(count.organizationId, count.count);
    });

    const searchTerm =
      filters.search && filters.search.trim() !== ""
        ? `%${filters.search.trim()}%`
        : undefined;

    const organizations = await this.db
      .select()
      .from(schema.organization)
      .where(
        searchTerm ? ilike(schema.organization.name, searchTerm) : undefined,
      )
      .orderBy(asc(schema.organization.name));

    // Apply status filter if provided (metadata is text, so we parse it and check status on server instead of database).
    // This is to avoid chage BetterAuth metadata text type to JSONB, since we should not change types provided by BetterAuth.
    let filteredOrganizations = organizations;
    if (filters.status) {
      filteredOrganizations = organizations.filter((org) => {
        const metadata = parseOrganizationMetadata(org.metadata);
        return metadata?.status === filters.status;
      });
    }

    // Map organizations with user counts
    return filteredOrganizations.map((org) => ({
      ...org,
      userCount: countMap.get(org.id) || 0,
    }));
  }
}
