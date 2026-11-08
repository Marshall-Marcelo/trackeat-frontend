import { format } from 'date-fns';

export function getCurrentMonth(date: string | number | Date) {
  return format(date, 'MMMM');
}

export function getCurrentYear(date: string | number | Date) {
  return format(date, 'yyyy');
}

export function formatDate(date: string | number | Date) {
  return format(date, 'yyyy-MM-dd');
}

export function formatDisplayDate(date: string | number | Date) {
  return format(date, 'MMM dd, EEEE');
}
