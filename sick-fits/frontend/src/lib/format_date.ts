export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
