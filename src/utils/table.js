export const dateComparator = (date1, date2) => {
  const date1Number = date1 && new Date(date1).getTime();
  const date2Number = date2 && new Date(date2).getTime();

  if (date1Number == null && date2Number == null) {
    return 0;
  }

  if (date1Number == null) {
    return -1;
  }
  if (date2Number == null) {
    return 1;
  }

  return date1Number - date2Number;
};
