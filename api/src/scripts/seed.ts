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
    createAccount("guitar-1@mj.fm", "W", "TEST", "Guitar"),
    createAccount("guitar-2@mj.fm", "Peter", "TEST", "Guitar"),
    createAccount("guitar-3@mj.fm", "Slash", "TEST", "Guitar"),
    createAccount("guitar-4@mj.fm", "Rob1", "TEST", "Guitar"),
    createAccount("guitar-5@mj.fm", "AliciaK", "TEST", "Guitar"),
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
  const nrOfPractices = Math.floor(Math.random() * (9 - 10)) + 10;
  console.log("Seed Account practices", acc.email, nrOfPractices);
  for (let i = 0; i <= nrOfPractices; i++) {
    const duration = Math.floor(Math.random() * (120 - 3200)) + 3200;
    const offset = Math.floor(Math.random() * (1 - 4) + 4);

    try {
      await client.query(
        'INSERT INTO practices ("accountId", type, duration, visibility, timestamp) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [acc.id, "Guitar", duration, 1, dayjs().subtract(i * offset, "day")]
      );
    } catch (err) {
      console.error("Error creating practice", err);
    }

    await createPractice(acc.id, {
      type: "Guitar",
      duration: duration,
    });
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
