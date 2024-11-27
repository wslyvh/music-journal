import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export function formatDate(date: string | number | Date) {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function formatTime(seconds: number) {
  const d = dayjs.duration(seconds, "seconds");
  if (d.hours() > 0) {
    return d.format("H:mm:ss");
  }

  return d.format("mm:ss");
}

export function formatDuration(
  duration: number,
  asMinutes?: boolean,
  label?: boolean
) {
  if (duration >= 7200 && !asMinutes) {
    return `${Math.round(dayjs.duration(duration, "seconds").asHours())}${
      label ? " hrs" : ""
    }`;
  }

  if (duration >= 60)
    return `${Math.round(dayjs.duration(duration, "seconds").asMinutes())}${
      label ? " mins" : ""
    }`;

  return `<1${label ? " min" : ""}`;
}
