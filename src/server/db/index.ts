import { drizzle } from "drizzle-orm/d1";

import * as schema from "./schema";

export const db = drizzle(process.env.DATABASE, { schema, logger: true });

// Add a safety check for database operations
export function getDB() {
  if (!db) {
    throw new Error(
      "Database is not initialized. Check your environment variables and Cloudflare bindings."
    );
  }
  return db;
}
