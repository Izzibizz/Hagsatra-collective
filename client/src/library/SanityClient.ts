import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: "20j0pl7m", 
  dataset: "production",
  apiVersion: "2025-12-09", 
  useCdn: false, // true = snabbare, men data kan vara lite gammal
});