import { getDbPool } from "@/clients/db";
import { Practice, PracticeData } from "@/types";
import { DEFAULTS } from "@/utils/config";
import dayjs from "dayjs";

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

export async function getPracticesByAccountId(
  accountId: string,
  instrument: string,
  page: number = 1,
  size: number = DEFAULTS.PAGE_SIZE
) {
  const pool = getDbPool();
  const client = await pool.connect();

  try {
    const params = instrument
      ? [accountId, size, (page - 1) * size, instrument]
      : [accountId, size, (page - 1) * size];

    const result = await client.query(
      `WITH total AS (
        SELECT COUNT(*) AS count,
        SUM(duration) AS total_duration
        FROM practices 
        WHERE "accountId" = $1
        ${instrument ? "AND type = $4" : ""}
      )
      SELECT p.*, total.count, total.total_duration
      FROM practices p, total
      WHERE p."accountId" = $1
      ${instrument ? "AND type = $4" : ""}
      ORDER BY p.timestamp DESC
      LIMIT $2 OFFSET $3`,
      params
    );

    const total = parseInt(result.rows[0]?.count ?? "0");
    const totalDuration = parseInt(result.rows[0]?.total_duration ?? "0");

    return {
      total,
      totalDuration,
      currentPage: page,
      items: result.rows.map((row) => ({
        ...row,
        count: undefined,
        total_duration: undefined,
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
    // not possible to update duration. Only runs on Timer
    const result = await client.query(
      `UPDATE practices 
      SET type = $1, data = $2, notes = $3, rating = $4, visibility = $5
      WHERE id = $6 AND "accountId" = $7
      RETURNING *`,
      [
        data.type,
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

export async function getLeaderboard(
  instrument: string,
  period: number = 30,
  page: number = 1,
  size: number = DEFAULTS.PAGE_SIZE
) {
  const pool = getDbPool();
  const client = await pool.connect();

  try {
    console.log("Get leaderboard", instrument, period, page, size);

    const result = await client.query(
      `WITH stats AS (
        SELECT 
          a.id,
          a.username,
          COUNT(*) as practices,
          SUM(p.duration) as duration
        FROM practices p
        JOIN accounts a ON p."accountId" = a.id
        WHERE p.type = $1
          AND p.timestamp >= NOW() - INTERVAL '1 day' * $2
          AND p.visibility = 1
        GROUP BY a.id, a.username
      ),
      total AS (
        SELECT COUNT(*) as count FROM stats
      )
      SELECT s.*, total.count
      FROM stats s, total
      ORDER BY duration DESC
      LIMIT $3 OFFSET $4`,
      [instrument, period, size, (page - 1) * size]
    );

    const total = parseInt(result.rows[0]?.count ?? "0");

    console.log("Get leaderboard", total);
    return {
      total,
      currentPage: page,
      items: result.rows.map((row) => ({
        ...row,
        count: undefined,
      })),
    };
  } catch (err) {
    console.error("Error getting leaderboard stats", err);
    client.release();
    return {
      total: 0,
      currentPage: page,
      items: [],
    };
  }
}
