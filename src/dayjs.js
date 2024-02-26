// @ts-check
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export { dayjs };
