import dayjs from "dayjs/esm";
import relativeTime from "dayjs/esm/plugin/relativeTime";
import utc from "dayjs/esm/plugin/utc";
import timezone from "dayjs/esm/plugin/timezone";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export { dayjs };
