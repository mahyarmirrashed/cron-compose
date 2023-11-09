export type DayOfWeek = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
export type MonthOfYear =
  | "jan"
  | "feb"
  | "mar"
  | "apr"
  | "may"
  | "jun"
  | "jul"
  | "aug"
  | "sep"
  | "oct"
  | "nov"
  | "dec";

/**
 * Represents the type of slots available in a Cron expression.
 */
export enum SlotType {
  /**
   * Seconds slot (0-59).
   */
  Second,
  /**
   * Minutes slot (0-59).
   */
  Minute,
  /**
   * Hours slot (0-23).
   */
  Hour,
  /**
   * Days slot (1-31).
   */
  Day,
  /**
   * Months slot (1-12 or Jan-Dec).
   */
  Month,
  /**
   * Day of the week slot (0-6 or Sun-Sat).
   */
  DayOfWeek,
}
