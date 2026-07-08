import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
import relativeTime from "dayjs/plugin/relativeTime.js";

dayjs.extend(relativeTime);
dayjs.extend(duration);

export { dayjs };
