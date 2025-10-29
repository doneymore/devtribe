import moment from 'moment';

export function formatBlogDate(dateString: string): string {
  return moment(dateString).format('DD MMM YYYY');
}