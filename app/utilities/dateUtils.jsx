export function subtractDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function formatDate(date, format) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  if (format === 'YYYY-MM-DD') {
    return `${year}-${(month > 8) ? '' : '0'}${month+1}-${(day > 9) ? '' : '0'}${day}`;
  }
}
