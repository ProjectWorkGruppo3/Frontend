import dayjs from 'dayjs';

export const fullDatetimeWithoutYear = (date: Date) =>
  dayjs(date).format('DD/MM  h:mm:ss A');
export const normalDate = (date: Date) => dayjs(date).format('DD/MM/YYYY');

export const normalFullTime = (date: Date) => dayjs(date).format('DD/MM/YYYY hh:mm:ss');