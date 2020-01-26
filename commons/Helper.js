import numeral from 'numeral'
import moment from 'moment'

const trillion = 1000000000000
const billion = 1000000000
const million = 1000000

export default class Helper {
  static formatTransactionDate(timeStamp) {
    return moment(new Date(timeStamp * 1000)).calendar(null, {
      sameDay: '[Today] hh:mm A',
      nextDay: 'MMMM DD, YYYY',
      nextWeek: 'MMMM DD, YYYY',
      lastDay: 'MMMM DD, YYYY',
      lastWeek: 'MMMM DD, YYYY',
      sameElse: 'MMMM DD, YYYY'
    })
  }
}
