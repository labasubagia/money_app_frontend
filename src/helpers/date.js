import moment from 'moment';

const DEFAULT_START_DATE = moment().startOf('month').format('YYYY-MM-DD');
const DEFAULT_END_DATE = moment().endOf('month').format('YYYY-MM-DD');

export { DEFAULT_START_DATE, DEFAULT_END_DATE };
