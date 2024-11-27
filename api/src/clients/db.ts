import { Pool, PoolConfig } from "pg";
import { CONFIG } from "@/utils/config";

let dbPool: Pool;

export const DB_POOL_CONFIG: PoolConfig = {
  connectionString: CONFIG.DB_CONNECTIONSTRING,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 90,
};

export function getDbPool() {
  if (!dbPool) {
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
    await client.query(createSessionsTable);
    await client.query(createPracticeTable);
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
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    "appId" VARCHAR(255),
    type VARCHAR(255),
    // instruments[]
    "createdAt" TIMESTAMPTZ NOT NULL,
    "updatedAt" TIMESTAMPTZ,
    UNIQUE (email, "appId")
  );

  CREATE INDEX IF NOT EXISTS "IDX_account_email" ON accounts (email);
`;

const createSessionsTable = `
  CREATE TABLE IF NOT EXISTS sessions (
    "sid" varchar PRIMARY KEY,
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
  );

  CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON sessions ("expire");
`;

const createPracticeTable = `
  CREATE TABLE IF NOT EXISTS practices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "accountId" UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    duration INTEGER NOT NULL,
    data INTEGER,
    notes TEXT,
    rating SMALLINT,
    visibility SMALLINT NOT NULL DEFAULT 0,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE INDEX IF NOT EXISTS practice_account_id_idx ON practices("accountId");
  CREATE INDEX IF NOT EXISTS practice_timestamp_idx ON practices(timestamp);
  CREATE INDEX IF NOT EXISTS practice_type_idx ON practices(type);
`;
