// utils/dateUtils.js

import { parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export const formatDateTimeIST = (dateString) => {
  return formatInTimeZone(parseISO(dateString), 'Asia/Kolkata', 'dd MMM yyyy HH:mm:ss');
};

export const calculateIssueAge = (createdOn) => {
  const createdDate = new Date(createdOn);
  const currentDate = new Date();
  const differenceInTime = currentDate - createdDate;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};
