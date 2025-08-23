import { DATE_YYYYMMDD_SLASH_FORMAT } from '@/common/constants';
import { DateTime } from 'luxon';

export const convertDatetoString = (
  datetime: Date,
  formatString: string = DATE_YYYYMMDD_SLASH_FORMAT,
) => {
  return DateTime.fromJSDate(datetime).toFormat(formatString);
};

// Gte: greater than or equal >=
export const isDateGte = (closerToPastDate: Date, closerToFutureDate: Date) => {
  const differentInDays = DateTime.fromJSDate(closerToFutureDate).diff(
    DateTime.fromJSDate(closerToPastDate),
  ).days;
  return differentInDays >= 0;
};
