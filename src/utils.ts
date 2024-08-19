import { COLORS, ERROR_THRESHOLD, WARN_THRESHOLD } from "./constants";

export const getColorForModifiedFiles = (size: number): string => {
  if (size > ERROR_THRESHOLD) return COLORS.RED;
  if (size >= WARN_THRESHOLD) return COLORS.YELLOW;
  return COLORS.GREEN;
};
