import { getDbPool } from "@/clients/db";
import { Account, VerificationToken } from "@/types";

export async function createAccount(
  email: string,
  username?: string,
  appId?: string,
  instrument?: string
) {
  const pool = getDbPool();
  const client = await pool.connect();

  try {
    const result = await client.query(
      `INSERT INTO accounts (email, username, "appId", type, instruments, "createdAt")
      VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [
        email,
        username ?? email.split("@")[0],
        appId,
        "user",
        [instrument ?? "My Instrument"],
      ]
    );

    return result.rows[0] as Account;
  } catch (err) {
    console.error("Error creating account", err);
  } finally {
    client.release();
  }
}

export async function getAccount(userId: string) {
  const pool = getDbPool();
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT * FROM accounts WHERE id = $1", [
      userId,
    ]);

    return result.rows[0] as Account;
  } catch (err) {
    console.error("Error getting account", err);
  } finally {
    client.release();
  }
}

export async function getAccountByEmail(email: string, appId?: string) {
  const pool = getDbPool();
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT * FROM accounts WHERE email = $1 AND ("appId" = $2 OR "appId" IS NULL)',
      [email, appId || null]
    );

    return result.rows[0] as Account;
  } catch (err) {
    console.error("Error getting account by email", err);
  } finally {
    client.release();
  }
}

export async function updateAccount(userId: string, account: Account) {
  const pool = getDbPool();
  const client = await pool.connect();

  try {
    const result = await client.query(
      'UPDATE accounts SET email = $1, username = $2, instruments = $3, "updatedAt" = NOW() WHERE id = $4 RETURNING *',
      [account.email, account.username, account.instruments, userId]
    );

    return result.rows[0] as Account;
  } catch (err) {
    console.error("Error updating account", err);
  } finally {
    client.release();
  }
}

export async function deleteAccount(userId: string) {
  const pool = getDbPool();
  const client = await pool.connect();

  try {
    await client.query("DELETE FROM accounts WHERE id = $1", [userId]);
    return true;
  } catch (err) {
    console.error("Error deleting account", err);
  } finally {
    client.release();
  }

  return false;
}

export async function createVerificationToken(identifier: string) {
  const pool = getDbPool();
  const client = await pool.connect();
  const nonce = Math.floor(Math.random() * (999999 - 100000)) + 100000;
  const expires = new Date(Date.now() + 1000 * 60 * 20);

  try {
    const result = await client.query(
      "INSERT INTO verification_tokens (identifier, token, expires) VALUES ($1, $2, $3) RETURNING *",
      [identifier, nonce, expires]
    );

    return result.rows[0] as VerificationToken;
  } catch (err) {
    console.error("Error creating verification token", err);
  } finally {
    client.release();
  }
}

export async function verifyVerificationToken(
  identifier: string,
  token: number
) {
  const pool = getDbPool();
  const client = await pool.connect();

  try {
    const result = await client.query(
      "SELECT * FROM verification_tokens WHERE identifier = $1 AND token = $2 AND expires > NOW()",
      [identifier, token]
    );

    return result.rows[0] as VerificationToken;
  } catch (err) {
    console.error("Error verifying verification token", err);
  } finally {
    client.release();
  }
}
