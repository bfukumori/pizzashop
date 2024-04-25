import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function dateFormatter(date: Date) {
  return dayjs(date).locale('pt-br').fromNow()
}
