export function DateTimeFormat(dateTimeStr: string): string {
  const date = new Date(dateTimeStr);

  const month = date.getMonth() + 1
  const mm = month.toString().padStart(2, '0');

  const day = date.getDate()
  const dd = day.toString().padStart(2, '0');
  
  const year = date.getFullYear();

  const hours = date.getHours()
  const HH = hours.toString().padStart(2, '0');

  const minutes = date.getMinutes()
  const MM = minutes.toString().padStart(2, '0');

  return `${mm}/${dd}/${year} ${HH}:${MM}`;
}

export function parseDate_Time(dateTimeStr: string): Date | null {
  const [dateSplit, timeSplit] = dateTimeStr.split(' ');

  const [month, day, year] = dateSplit.split('/').map(Number);
  const [hour, minute] = timeSplit.split(':').map(Number);

  return new Date(year, month - 1, day, hour, minute); 
}


export function compare(task1, task2) {
  const date1 = parseDate_Time(task1.dateTime);
  const date2 = parseDate_Time(task2.dateTime);

  if (date1 && date2) {
    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    } else {
      return 0;
    }
  } 
}

export function sortTasks(items) {
  return items.sort(compare);
}


