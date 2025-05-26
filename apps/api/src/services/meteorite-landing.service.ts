import type { MeteoriteLanding } from "@fsm/types";
import type { QueryResult } from "pg";
import type { MeteoriteLandingRepository } from "../repositories/meteorite-landing.repository";

export interface ListOptions {
  page?: number;
  pageSize?: number;
  year?: string;
  minMass?: number;
}

export class MeteoriteService {
  constructor(private readonly repo: MeteoriteLandingRepository) {}

  async list(
    opts: ListOptions,
  ): Promise<{ data: MeteoriteLanding[]; total: number }> {
    const all = await this.repo.findAll();
    let filtered = all;

    if (opts.year) {
      filtered = filtered.filter((m) => m.year === opts.year);
    }

    if (opts.minMass !== undefined) {
      filtered = filtered.filter(
        (m) => parseFloat(m.mass ?? "0") >= opts.minMass!,
      );
    }

    const total = filtered.length;
    const page = opts.page ?? 1;
    const size = opts.pageSize ?? 10;
    const offset = (page - 1) * size;
    const data = filtered.slice(offset, offset + size);

    return { data, total };
  }

  async getById(id: string): Promise<MeteoriteLanding | null> {
    const rec = await this.repo.findById(id);
    return rec ?? null;
  }

  async listYears(): Promise<string[]> {
    // throw ClientError.NotImplemented;
    const all = await this.repo.findAll();
    return Array.from(new Set(all.map((m) => m.year))).filter(
      (y): y is string => y !== null && y !== undefined,
    );
  }

  async listClasses(): Promise<string[]> {
    const all = await this.repo.findAll();
    return Array.from(new Set(all.map((m) => m.recclass))).filter(
      (recclass): recclass is string =>
        recclass !== null && recclass !== undefined,
    );
  }

  async create(data: Partial<MeteoriteLanding>): Promise<MeteoriteLanding> {
    return this.repo.create(data);
  }

  async update(
    id: string,
    data: Partial<Omit<MeteoriteLanding, "id">>,
  ): Promise<MeteoriteLanding> {
    return this.repo.update(id, data);
  }

  async delete(id: string): Promise<QueryResult> {
    return await this.repo.delete(id);
  }
}
