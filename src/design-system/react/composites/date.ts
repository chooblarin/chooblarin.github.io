import { format } from "date-fns";

export const formatDisplayDate = (value: Date | string) => {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return format(date, "yyyy-MM-dd");
};
