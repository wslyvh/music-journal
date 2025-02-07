import { createPractice, deletePractices } from "@/client/practices";
import dayjs from "dayjs";

export async function seedPractices() {
  await deletePractices();

  const practiceCount = Math.floor(Math.random() * 200) + 200;
  for (let i = 0; i < practiceCount; i++) {
    const daysAgo = Math.floor(Math.random() * 360);
    const duration = Math.floor(Math.random() * 2400) + 300;
    const rating = Math.floor(Math.random() * 5) + 1;

    await createPractice({
      type: "Guitar",
      duration,
      notes: `Practice session ${i + 1}`,
      rating,
      timestamp: dayjs().subtract(daysAgo, "days").valueOf(),
    });
  }

  console.log(`Created ${practiceCount} practices`);
}
