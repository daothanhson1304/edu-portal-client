import dayjs from 'dayjs';
import { DATE_TIME_FORMAT_LONG } from '@/constants/format';

export const formatDateTime = (date: Date) => {
  return dayjs(date).format(DATE_TIME_FORMAT_LONG);
};
