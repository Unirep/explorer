import { XMLParser, XMLValidator } from 'fast-xml-parser'
import { URL } from 'url'

export const isValidAttesterDescription = (icon, name, description, url) => {
  icon = icon.trim()
  if (XMLValidator.validate(icon) !== true) {
    return false
  }
  const parser = new XMLParser()
  let json

  try {
    json = parser.parse(icon)
  } catch {
    console.log(json)
    return false
  }

  if (
    !json ||
    !('svg' in json) ||
    description.length > 500 ||
    name.length == 0
  ) {
    console.log('HERE')
    return false
  }

  const isValidUrl = (s) => {
    try {
      new URL(s)
      return true
    } catch (err) {
      console.log(s)
      return false
    }
  }

  if (!isValidUrl(url)) {
    return false
  }

  return true
}
