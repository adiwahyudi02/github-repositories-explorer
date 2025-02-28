/**
 * Utility function to format a date string from ISO format to "MMM DD, YYYY".
 * This is useful for displaying dates in a more readable format.
 *
 * @param dateString {string} - The date string in ISO format (e.g., "2019-01-10T00:35:27Z").
 *
 * @returns {string} - Returns the formatted date string in "MMM DD, YYYY" format.
 */
export const updatedOnFormatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};
