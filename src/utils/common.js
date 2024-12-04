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

export function formatAction(action) {
  switch (action) {
    case "creditDeduction":
      return "Credit Deduction";
    case "creditTopUp":
      return "Credit Top Up";
    case "planPurchase":
      return "Plan Purchase";
    default:
      return action;
  }
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export function formatDate(isoDateString, includeTime = true) {
  const date = new Date(isoDateString);
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const suffixes = ["th", "st", "nd", "rd"];
  const daySuffix =
    day % 10 < 4 && Math.floor(day / 10) !== 1
      ? suffixes[day % 10]
      : suffixes[0];
  const formattedDate = `${day}${daySuffix} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
  const formattedTime = date.toLocaleTimeString("en-GB");

  return includeTime ? `${formattedDate}, ${formattedTime}` : formattedDate;
}
