import { curry, pipe } from "ramda"
import { left, right, Either } from "fp-ts/Either"
/**
 * Implementation is based on https://tools.ietf.org/html/rfc4180#section-2
 */

type ValueType = string | number | boolean | undefined

const containsStringOf = (field: string, chars: string[]) =>
  chars.some((char) => field.includes(char))

const convertTypeToString = curry(
  (type: ValueType, field: string): ValueType =>
    typeof field === type ? String(field) : field
)

const surroundFieldsWithSpecialCharactersInQuotes = curry(
  (chars: string[], field: string) =>
    containsStringOf(field, chars) ? `"${field}"` : field
)

const escapeQuotes = (field: string | undefined) =>
  field?.replace(/"/gu, '""') ?? ""

const processField = pipe(
  convertTypeToString("number"),
  convertTypeToString("boolean"),
  escapeQuotes,
  surroundFieldsWithSpecialCharactersInQuotes([",", '"', "\r\n"])
)

const createCsvRowString = (fields: ValueType[]) =>
  fields.map(processField).join(",")

interface ArbitraryObjectType {
  [key: string]: ValueType
}

const isNotEmptyArray = <T extends ArbitraryObjectType>(
  inputObjectArray: T[]
) => inputObjectArray.length === 0

const processObjectArrayToCsv = <T extends ArbitraryObjectType>(
  inputObjectArray: T[]
) => {
  const columnHeaders = Object.keys(inputObjectArray[0])
  const rows = inputObjectArray
    .map((row) =>
      // eslint-disable-next-line security/detect-object-injection
      createCsvRowString(columnHeaders.map((columnHeader) => row[columnHeader]))
    )
    .join("\r\n")

  const headerRow = createCsvRowString(columnHeaders)
  return `${headerRow}\r\n${rows}`
}

const fromObjectArray = <T extends ArbitraryObjectType>(
  inputObjectArray: T[]
): Either<string, string> =>
  isNotEmptyArray(inputObjectArray)
    ? left("inputObjectArray.length must have a length greater than zero")
    : right(processObjectArrayToCsv(inputObjectArray))

const csv = {
  fromObjectArray,
}

export default csv
