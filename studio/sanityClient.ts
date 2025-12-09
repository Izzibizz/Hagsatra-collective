import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: "20j0pl7m",        // ditt projectId
  dataset: "production",
  apiVersion: "2025-12-03",
  useCdn: true,
});
