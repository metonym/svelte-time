const UNITS = [
  ["y", 365 * 86_400_000],
  ["mo", 30 * 86_400_000],
  ["d", 86_400_000],
  ["h", 3_600_000],
  ["m", 60_000],
  ["s", 1_000],
];

/**
 * Compact single-unit relative time, e.g. "4d", "2h", "5y", "1m", "6s".
 * Largest applicable unit, floor-rounded, magnitude only (no sign/suffix —
 * pair with a "+"/"-" prefix yourself if you need direction).
 * @param {number} ms absolute or signed duration in milliseconds
 * @returns {string}
 */
export function microFormat(ms) {
  const abs = Math.abs(ms);
  for (const [unit, unitMs] of UNITS) {
    if (abs >= unitMs) return `${Math.floor(abs / unitMs)}${unit}`;
  }
  return "0s";
}
