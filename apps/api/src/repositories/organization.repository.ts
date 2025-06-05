import * as schema from "@/models";
import { type OrganizationSelect } from "@/models";
import { asc, sql } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

export interface IOrganizationRepository {
  findAll(): Promise<(OrganizationSelect & { userCount: number })[]>;
}

export class OrganizationRepository implements IOrganizationRepository {
  constructor(private readonly db: NodePgDatabase<typeof schema>) {}

  async findAll(): Promise<(OrganizationSelect & { userCount: number })[]> {
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

    const organizations = await this.db
      .select()
      .from(schema.organization)
      .orderBy(asc(schema.organization.name));

    return organizations.map((org) => ({
      ...org,
      userCount: countMap.get(org.id) || 0,
    }));
  }
}
