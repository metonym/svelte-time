import { dayjs } from "./dayjs";
import duration from "dayjs/esm/plugin/duration";

dayjs.extend(duration);

export { dayjs };
