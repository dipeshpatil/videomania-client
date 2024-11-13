import { timeInMinutes } from "./common-constants";

export function getMinutes(timeString) {
  const { ONE_HOUR, ONE_DAY, ONE_WEEK, ONE_MONTH, ONE_YEAR, THREE_MONTHS } =
    timeInMinutes;

  switch (timeString) {
    case ONE_DAY.key:
      return ONE_DAY.value;
    case ONE_HOUR.key:
      return ONE_HOUR.value;
    case ONE_WEEK.key:
      return ONE_WEEK.value;
    case ONE_MONTH.key:
      return ONE_MONTH.value;
    case THREE_MONTHS.key:
      return THREE_MONTHS.value;
    case ONE_YEAR.key:
      return ONE_YEAR.value;
    default:
      return 10;
  }
}

export function copyToClipBoard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Link copied to clipboard!");
  });
}

export function formatDate(timeStamp) {
  const date = new Date(timeStamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatFileSize(sizeInBytes) {
  const sizeInMB = sizeInBytes / (1024 * 1024);
  return sizeInMB.toFixed(2) + " MB";
}

export function getRemainingTimeFromMinutes(minutes) {
  if (minutes <= 60) return `${minutes}m`;
  else if (minutes > 60 && minutes <= 24 * 60)
    return `${Math.floor(minutes / 60)}h`;
  else if (minutes > 24 * 60 && minutes <= 30 * 24 * 60)
    return `${Math.floor(minutes / (24 * 60))}d`;
  else if (minutes > 30 * 24 * 60 && minutes <= 12 * 30 * 24 * 60)
    return `${Math.floor(minutes / (30 * 24 * 60))}M`;
  else if (minutes > 12 * 30 * 24 * 60)
    return `${Math.floor(minutes / (12 * 30 * 24 * 60))}y`;
  else return "Unknown Time";
}
