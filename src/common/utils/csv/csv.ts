import { ValueType } from "./types";
import { left, right, Either } from "fp-ts/Either"
import processField from "./processField"

/**
 * Implementation is based on https://tools.ietf.org/html/rfc4180#section-2
 */

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

const Csv = {
  fromObjectArray,
}

export default Csv
