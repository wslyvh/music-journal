import { initDbTables } from "@/clients/db";

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
