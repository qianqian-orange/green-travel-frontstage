export function leapYear(year) {
  return year % 4 === 0 && year % 100 !== 0;
}

export function getDays(date) {
  const month = date.getMonth() + 1;
  if (month % 2 === 0) {
    if (month === 2) {
      const year = date.getFullYear();
      const flag = leapYear(year);
      return flag ? 29 : 28;
    }
    return 30;
  }
  return 31;
}

export default {};