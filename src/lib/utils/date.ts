import { format } from 'date-fns';

export function getCurrentMonthForDB(date: string | number | Date) {
  return format(date, 'M');
}

export function getCurrentYearForDB(date: string | number | Date) {
  return format(date, 'yyyy');
}

export function formatDateForNav(date: string | number | Date) {
  return format(date, 'MMMM yyyy');
}

export function formatDisplayDate(date: string | number | Date) {
  return format(date, 'MMM dd, EEEE');
}
