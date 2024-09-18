import { z } from "zod";

const SearchParamsSchema = z.object({
  search: z.string().optional(),
  departement: z.enum(["14", "27", "50", "61", "76"]).optional(),
  page: z.string().optional(),
});
export type SearchParams = z.infer<typeof SearchParamsSchema>;
