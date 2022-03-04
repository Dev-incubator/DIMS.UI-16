export function changeDateFormat(date) {
  if (date.includes('.')) {
    return date.split('.').reverse().join('-');
  }

  return date.split('-').reverse().join('.');
}
