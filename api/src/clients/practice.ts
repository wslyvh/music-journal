import { getDbPool } from "@/clients/db";
import { Practice, PracticeData } from "@/types";
import { DEFAULTS } from "@/utils/config";

export async function createPractice(accountId: string, data: PracticeData) {
  const pool = getDbPool();
  const client = await pool.connect();

  try {
    const result = await client.query(
      'INSERT INTO practices ("accountId", type, duration, data, notes, rating, visibility, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *',
      [
        accountId,
        data.type,
        data.duration,
        data.data,
        data.notes,
        data.rating,
        data.visibility ?? 1, // public by default
      ]
    );

    return result.rows[0] as Practice;
  } catch (err) {
    console.error("Error creating practice", err);
  } finally {
    client.release();
  }
}

export async function getPractice(userId: string, id: string) {
  const pool = getDbPool();
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT * FROM practices WHERE id = $1 AND "accountId" = $2',
      [id, userId]
    );

    return result.rows[0] as Practice;
  } catch (err) {
    console.error("Error getting practice", err);
  } finally {
    client.release();
  }
}

export async function getPracticeByAccountId(
  accountId: string,
  page: number = 1,
  size: number = DEFAULTS.PAGE_SIZE
) {
  const pool = getDbPool();
  const client = await pool.connect();

  try {
    const result = await client.query(
      `WITH total AS (
        SELECT COUNT(*) AS count 
        FROM practices 
        WHERE "accountId" = $1
      )
      SELECT p.*, total.count
      FROM practices p, total
      WHERE p."accountId" = $1
      ORDER BY p.timestamp DESC
      LIMIT $2 OFFSET $3`,
      [accountId, size, (page - 1) * size]
    );

    const total = parseInt(result.rows[0]?.count ?? "0");

    return {
      total,
      currentPage: page,
      items: result.rows.map((row) => ({
        ...row,
        count: undefined,
      })) as Practice[],
    };
  } catch (err) {
    console.error("Error getting practice", err);
  } finally {
    client.release();
  }
}

export async function updatePractice(
  userId: string,
  id: string,
  data: PracticeData
) {
  const pool = getDbPool();
  const client = await pool.connect();

  try {
    const result = await client.query(
      `UPDATE practices 
      SET type = $1, duration = $2, data = $3, notes = $4, rating = $5, visibility = $6
      WHERE id = $7 AND "accountId" = $8
      RETURNING *`,
      [
        data.type,
        data.duration,
        data.data,
        data.notes,
        data.rating,
        data.visibility,
        id,
        userId,
      ]
    );

    return result.rows[0] as Practice;
  } catch (err) {
    console.error("Error updating practice", err);
  } finally {
    client.release();
  }
}

export async function deletePractice(userId: string, id: string) {
  const pool = getDbPool();
  const client = await pool.connect();

  try {
    await client.query(
      'DELETE FROM practices WHERE id = $1 AND "accountId" = $2',
      [id, userId]
    );
    return true;
  } catch (err) {
    console.error("Error deleting practice", err);
  } finally {
    client.release();
  }

  return false;
}
