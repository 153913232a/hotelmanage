function formatDays(date) {
  let day = null
  if (arguments.length) {
    day = new Date(date)
    console.log(date)
  } else {
    day = new Date()
  }
  let year = day.getFullYear()
  let month = format(day.getUTCMonth() + 1)
  let days= format(day.getDate())
  let hour = format(day.getHours())
  let minutes = format(day.getMinutes())
  let seconds = format(day.getSeconds())
  return `${year}-${month}-${days} ${hour}:${minutes}:${seconds}`
}
function format(number) {
  if (number <10) {
    return '0' + number
  } else {
    return number
  }
}
export {formatDays}
