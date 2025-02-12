import {
  scheduleNotificationAsync,
  SchedulableTriggerInputTypes,
  cancelAllScheduledNotificationsAsync,
  cancelScheduledNotificationAsync,
  getAllScheduledNotificationsAsync,
} from "expo-notifications";

export async function isDailyReminderEnabled() {
  console.log("Get daily reminders");

  try {
    const notifications = await getAllScheduledNotificationsAsync();
    const dailyReminders = notifications.filter(
      (i: any) => i.trigger?.channelId === "daily-practice"
    );

    return dailyReminders.length > 0;
  } catch (error) {
    console.error("Error getting daily reminders:", error);
    return false;
  }
}

export async function setDailyReminder() {
  console.log("Setting daily reminder notification");

  try {
    await cancelDailyReminder();

    await scheduleNotificationAsync({
      content: {
        title: "Time to practice! 🎵",
        body: "It's time for your daily music practice!",
        vibrate: [0, 300, 100, 300],
        sound: true,
        priority: "high",
        interruptionLevel: "critical",
      },
      trigger: {
        type: SchedulableTriggerInputTypes.DAILY,
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        channelId: "daily-practice",
      },
    });

    return true;
  } catch (error) {
    console.error("Error setting daily reminder:", error);
    return false;
  }
}

export async function cancelDailyReminder() {
  console.log("Cancelling daily reminders");

  try {
    const notifications = await getAllScheduledNotificationsAsync();
    const dailyReminders = notifications.filter(
      (i: any) => i.trigger?.channelId === "daily-practice"
    );

    await Promise.all(
      dailyReminders.map((i) => cancelScheduledNotificationAsync(i.identifier))
    );

    return true;
  } catch (error) {
    console.error("Error canceling notifications:", error);
    return false;
  }
}

export async function cancelAllNotifications() {
  console.log("Cancelling all notifications");

  await cancelAllScheduledNotificationsAsync();
}
