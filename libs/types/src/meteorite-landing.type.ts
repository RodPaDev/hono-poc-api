import { z } from "zod";

export const MeteoriteLandingSchema = z
  .object({
    id: z.string().uuid(),
    datasetId: z.number().int(),
    name: z.string(),
    nametype: z.string().nullable(),
    recclass: z.string().nullable(),
    mass: z.string().nullable(),
    fall: z.string().nullable(),
    year: z.string().nullable(),
    reclat: z.string().nullable(),
    reclong: z.string().nullable(),
    geolocation: z.string().nullable(),
  })
  .strict();

export type MeteoriteLanding = z.infer<typeof MeteoriteLandingSchema>;
