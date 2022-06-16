import dayjs from "dayjs/esm";
import relativeTime from "dayjs/esm/plugin/relativeTime";

dayjs.extend(relativeTime);

export { dayjs };