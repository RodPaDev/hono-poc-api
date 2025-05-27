import type { MeteoriteLanding } from "@fsm/types";
import { eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { QueryResult } from "pg";

import * as schema from "@/models";
import { meteoriteLandingTable } from "@/models/meteorite-landing.model";

export interface IMeteoriteLandingRepository {
  findAll(): Promise<MeteoriteLanding[]>;
  findById(id: string): Promise<MeteoriteLanding | undefined>;
  findByDatasetId(datasetId: number): Promise<MeteoriteLanding[]>;
  create(data: Partial<MeteoriteLanding>): Promise<MeteoriteLanding>;
  update(
    id: string,
    data: Partial<Omit<MeteoriteLanding, "id">>,
  ): Promise<MeteoriteLanding>;
  delete(id: string): Promise<QueryResult>;
}

export class MeteoriteLandingRepository implements IMeteoriteLandingRepository {
  constructor(private readonly db: NodePgDatabase<typeof schema>) {}

  async findAll(): Promise<MeteoriteLanding[]> {
    return await this.db.select().from(meteoriteLandingTable);
  }

  async findById(id: string): Promise<MeteoriteLanding | undefined> {
    const result = await this.db
      .select()
      .from(meteoriteLandingTable)
      .where(eq(meteoriteLandingTable.id, id))
      .limit(1);

    return result[0];
  }

  async findByDatasetId(datasetId: number): Promise<MeteoriteLanding[]> {
    return await this.db
      .select()
      .from(meteoriteLandingTable)
      .where(eq(meteoriteLandingTable.datasetId, datasetId));
  }

  async create(data: Partial<MeteoriteLanding>): Promise<MeteoriteLanding> {
    const [inserted] = await this.db
      .insert(meteoriteLandingTable)
      .values(data as MeteoriteLanding)
      .returning();
    return inserted;
  }

  async update(
    id: string,
    data: Partial<Omit<MeteoriteLanding, "id">>,
  ): Promise<MeteoriteLanding> {
    const [updated] = await this.db
      .update(meteoriteLandingTable)
      .set(data)
      .where(eq(meteoriteLandingTable.id, id))
      .returning();
    return updated;
  }

  async delete(id: string): Promise<QueryResult> {
    return await this.db
      .delete(meteoriteLandingTable)
      .where(eq(meteoriteLandingTable.id, id));
  }
}
