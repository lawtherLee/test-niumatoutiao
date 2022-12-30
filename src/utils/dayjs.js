import dayjs from 'dayjs'

const relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/zh-cn')

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export const formetDate = (dateObj) => {
  return dayjs(dateObj).format('YYYY-MM-DD')
}

export const timeAgo = (targetTime) => {
  dayjs.extend(relativeTime)
  dayjs.locale('zh')
  const a = dayjs()
  const b = dayjs(targetTime)
  return a.to(b)
}
export default dayjs
