export function countText (content) {
  let number = content.length.toString()
  let str = ''
  if (number >= 1000) {
    str = number.substr(0, number.length - 3) + ',' + number.substr(number.length - 3)
  }
  if (number >= 1000000) {
    str = str.substr(0, str.length - 7) + ',' + str.substr(str.length - 7)
  }
  if (number >= 1000000000) {
    str = str.substr(0, str.length - 11) + ',' + str.substr(str.length - 11)
  }
  return str
}
