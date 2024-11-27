import { createAccount } from "@/clients/account";
import { initDbTables } from "@/clients/db";

const seed = true;

async function main() {
  await initDbTables();
}

main()
  .then(() => {
    console.log("All done!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error creating db tables", err);
  });
