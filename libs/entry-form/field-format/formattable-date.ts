const hour = String.raw`(?:[01]\d|2[0-3])`;
const minuteOrSecond = String.raw`[0-5]\d`;
const offset = `(?:Z|[+-]${hour}:?${minuteOrSecond})`;
const timeOfDay = String.raw`${hour}:${minuteOrSecond}(?::${minuteOrSecond}(?:\.\d+)?)?`;
const endOfDay = String.raw`24:00(?::00(?:\.0+)?)?`;
const isoDate = new RegExp(String.raw`^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(?:T(?:${timeOfDay}|${endOfDay})${offset}?)?$`, 'u');

const isCalendarDay = (year: number, month: number, day: number): boolean => {
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  return date.getUTCMonth() === month - 1;
};

export const formattableDate = (value: unknown): Date | string | number | undefined => {
  if (value instanceof Date || typeof value === 'number') {
    return Number.isNaN(new Date(value).getTime()) ? undefined : value;
  }
  // DatePipe reads other strings as a timestamp or by the browser's parsing, which guesses the order of day and month.
  const match = typeof value === 'string' ? isoDate.exec(value) : null;
  if (!match) {
    return undefined;
  }
  const [, year, month, day] = match.map(group => Number(group));
  // DatePipe rolls a day that the month does not have over into the next month.
  return isCalendarDay(year, month, day) ? match.input : undefined;
};
