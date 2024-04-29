import { groupBy } from "lodash"

export const groupAlphabetically = <T>(data: T[], fieldKey: keyof T) => {
  return groupBy(data, item => String(item[fieldKey])[0].toUpperCase())
}
