import { createAccount } from "@/clients/account";
import { getDbPool } from "@/clients/db";
import { createPractice } from "@/clients/practice";
import { Account } from "@/types";
import dayjs from "dayjs";
import { PoolClient } from "pg";

let client: PoolClient;

async function main() {
  const pool = getDbPool();
  client = await pool.connect();

  const result = await Promise.all([
    createAccount("test@w5.gg", "W5", "music-journal", "Ukulele"),

    createAccount("guitar-1@mj.fm", "W", "TEST", "Guitar"),
    createAccount("guitar-2@mj.fm", "Peter", "TEST", "Guitar"),
    createAccount("guitar-3@mj.fm", "Slash1", "TEST", "Guitar"),
    createAccount("guitar-4@mj.fm", "Rob0ne", "TEST", "Guitar"),
    createAccount("guitar-5@mj.fm", "Alicia K", "TEST", "Guitar"),
  ]);

  for (const acc of result) {
    if (acc) await Randomize(acc);
  }
}

async function Randomize(acc: Account) {
  if (!client) {
    console.error("No client connection..");
    return;
  }
  const nrOfPractices = Math.floor(Math.random() * (3 - 10)) + 10;
  console.log("Seed Account practices", acc.email, nrOfPractices);
  for (let i = 0; i <= nrOfPractices; i++) {
    const duration = Math.floor(Math.random() * (120 - 3200)) + 3200;
    const offset = Math.floor(Math.random() * (1 - 4) + 4);
    const timestamp = dayjs().subtract(i * offset, "day");
    const rating = Math.floor(Math.random() * 5) + 1;

    try {
      await client.query(
        'INSERT INTO practices ("accountId", type, duration, visibility, timestamp, rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [
          acc.id,
          acc.instruments[0] ?? "My Instrument",
          duration,
          1,
          timestamp,
          rating,
        ]
      );
    } catch (err) {
      console.error("Error creating practice", err);
    }
  }
}

main()
  .then(() => {
    console.log("All done!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error creating db tables", err);
  });
