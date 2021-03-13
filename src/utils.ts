enum WeekDays {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export const getDay = (day: Date): string => WeekDays[day.getDay()];

export const roundTemp = (num: number): number => Math.round(num * 10) / 10;
