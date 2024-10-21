import { Pool, PoolConfig } from "pg";
import { CONFIG } from "@/utils/config";

let dbPool: Pool;

export const DB_POOL_CONFIG: PoolConfig = {
  connectionString: CONFIG.DB_CONNECTIONSTRING,
  ssl:
    CONFIG.NODE_ENV === "production"
      ? true
      : {
          rejectUnauthorized: false,
        },
  max: 20,
};

export function getDbPool() {
  if (!dbPool) {
    console.log("Initializing db connection pool...");
    dbPool = new Pool(DB_POOL_CONFIG);

    dbPool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
    });
  }

  return dbPool;
}

export async function verify() {
  const pool = getDbPool();

  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Db Connection established:", result.rows[0].now);
  } catch (err) {
    console.error("Error verifying database connection", err);
  }
}

export async function initDbTables() {
  const pool = getDbPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    console.log("Creating Db tables...");
    await client.query(createVerificationTokenTable);
    await client.query(createAccountsTable);

    await client.query("COMMIT");
    console.log("Tables created successfully");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error creating tables", err);
  } finally {
    client.release();
  }
}

const createVerificationTokenTable = `
  CREATE TABLE IF NOT EXISTS verification_tokens (
    identifier TEXT NOT NULL,
    token INTEGER NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (identifier, token)
  );`;

const createAccountsTable = `
  CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL,
    email VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    type VARCHAR(255),
    "createdAt" TIMESTAMPTZ NOT NULL,
    "updatedAt" TIMESTAMPTZ,
    PRIMARY KEY (id)
  );`;
