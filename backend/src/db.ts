import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

// Use DATABASE_URL env var if present, otherwise assume local Postgres
const connectionString = process.env.DATABASE_URL || process.env.PG_CONNECTION_STRING || "postgresql://localhost:5432/veritas";
const pool = new Pool({ connectionString });

export const db = drizzle(pool);
export default db;
