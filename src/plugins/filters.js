import Vue from 'vue'
import { format, parseISO, isDate } from 'date-fns'

Vue.filter('date', (date) => {
  console.log(date)
  if (!isDate(parseISO(date.substr(0, 10)))) {
    return 'Not Active'
  }
  return format(parseISO(date.substr(0, 10)), 'MM/dd/yy')
})
