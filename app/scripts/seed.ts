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
      type: "guitar",
      duration,
      notes: `Practice session ${i + 1}`,
      rating,
      timestamp: dayjs().subtract(daysAgo, "days").valueOf(),
    });

    console.log(`Created practice ${i + 1}:`, {
      date: dayjs().subtract(daysAgo, "days").format("YYYY-MM-DD"),
      duration: `${Math.floor(duration / 60)} minutes`,
      rating,
    });
  }
}
