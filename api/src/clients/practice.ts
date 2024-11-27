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
  return {
    total: 25,
    totalDuration: 782000,
    currentPage: 1,
    items: [
      {
        id: 1,
        accountId: 1,
        type: "Guitar",
        duration: 12,
        notes: "C Scale",
        rating: 3,
        visibility: 1,
        timestamp: dayjs().subtract(1, "hour"),
      },
      {
        id: 2,
        accountId: 1,
        type: "Guitar",
        duration: 900,
        notes: "C Scale",
        rating: 4,
        visibility: 1,
        timestamp: dayjs().subtract(12, "hour"),
      },
      {
        id: 3,
        accountId: 1,
        type: "Guitar",
        duration: 1400,
        notes: "C Scale",
        data: 140,
        rating: 5,
        visibility: 1,
        timestamp: dayjs().subtract(1, "day"),
      },
      {
        id: 4,
        accountId: 1,
        type: "Guitar",
        duration: 240,
        notes: "C Scale",
        rating: 2,
        visibility: 1,
        timestamp: dayjs().subtract(3, "day"),
      },
      {
        id: 5,
        accountId: 1,
        type: "Guitar",
        duration: 1200,
        notes: "C Scale",
        rating: 3,
        visibility: 1,
        timestamp: dayjs().subtract(6, "day"),
      },
    ],
  };

  const pool = getDbPool();
  const client = await pool.connect();

  try {
    const result = await client.query(
      // TODO: Sum duration
      `WITH total AS (
        SELECT COUNT(*) AS count 
        FROM practices 
        WHERE "accountId" = $1
        ${instrument ? "AND type = $2" : ""}
      )
      SELECT p.*, total.count
      FROM practices p, total
      WHERE p."accountId" = $1
      ${instrument ? "AND type = $2" : ""}
      ORDER BY p.timestamp DESC
      LIMIT $3 OFFSET $4`,
      [accountId, instrument, size, (page - 1) * size]
    );

    const total = parseInt(result.rows[0]?.count ?? "0");
    const duration = parseInt(result.rows[0]?.duration ?? "0");

    return {
      total,
      totalDuration: duration,
      currentPage: page,
      items: result.rows.map((row) => ({
        ...row,
        count: undefined,
        duration: undefined,
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
  period: number = 30, // week, month, year
  page: number = 1,
  size: number = DEFAULTS.PAGE_SIZE
) {
  // const pool = getDbPool();
  // const client = await pool.connect();

  try {
    console.log("Fetch leaderboard stats", instrument, page, size);
    return {
      total: 25,
      currentPage: 1,
      items: [
        {
          id: "1",
          username: "Kurt Cobain",
          practices: 12,
          duration: 900 * period,
        },
        {
          id: "2",
          username: "Jimi Hendrix",
          practices: 9,
          duration: 800 * period,
        },
        {
          id: "3",
          username: "Eric Clapton",
          practices: 8,
          duration: 600 * period,
        },
        {
          id: "4",
          username: "Slash",
          practices: 5,
          duration: 500 * period,
        },
        {
          id: "5",
          username: "James Hetfield",
          practices: 3,
          duration: 400 * period,
        },
        {
          id: "6",
          username: "Anonymous",
          practices: 3,
          duration: 300 * period,
        },
        {
          id: "7",
          username: "Marc Knopfler",
          practices: 3,
          duration: 300 * period,
        },
        {
          id: "8",
          username: "Van Morrison",
          practices: 3,
          duration: 200 * period,
        },
        {
          id: "9",
          username: "Bob Marley",
          practices: 2,
          duration: 150 * period,
        },
        {
          id: "9",
          username: "Douwe Bob",
          practices: 2,
          duration: 100 * period,
        },
      ],
    };
  } catch (err) {
    console.error("Error getting leaderboard stats", err);
  } finally {
    // client.release();
  }

  return [];
}
