export const dayDiff = (other: Date) => {
  const one_day = 1000 * 60 * 60 * 24;
  other.setHours(0, 0, 0, 0);
  const present_date = new Date();
  if (present_date.getMonth() == 11 && present_date.getDate() > 25) {
    other.setFullYear(other.getFullYear() + 1);
  }
  let res = Math.round(
    (other.getTime() - present_date.getTime()) / one_day
  ).toFixed(0);
  return parseInt(res);
};
