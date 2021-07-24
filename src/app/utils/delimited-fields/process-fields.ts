import { ValueType } from "./types"
import { left, right, Either } from "fp-ts/Either"
import { curry, pipe } from "ramda"

interface ArbitraryObjectType {
  [key: string]: ValueType
}

const isEmptyArray = <T extends ArbitraryObjectType>(inputObjectArray: T[]) =>
  inputObjectArray.length === 0

const mapRowsToMatrix = <T extends ArbitraryObjectType>(
  inputObjectArray: T[],
  columnHeaders: (keyof T)[]
) =>
  inputObjectArray.map((row) =>
    // eslint-disable-next-line security/detect-object-injection
    columnHeaders.map((columnHeader) => row[columnHeader])
  )

const getHeaders = <T extends ArbitraryObjectType>(inputObjectArray: T[]) =>
  Object.keys(inputObjectArray[0])

const convertToMatrix = <T extends ArbitraryObjectType>(
  inputObjectArray: T[]
) => [
  getHeaders(inputObjectArray),
  ...mapRowsToMatrix(inputObjectArray, getHeaders(inputObjectArray)),
]

const processMatrixToOutputString = curry(
  (
    fieldSeparator: string,
    lineSeparator: string,
    fieldProcessor: (field: ValueType) => string,
    matrix: ReturnType<typeof convertToMatrix>
  ) =>
    matrix
      .map((row) => row.map(fieldProcessor).join(fieldSeparator))
      .join(lineSeparator)
)

const doProcess = <T extends ArbitraryObjectType>(
  fieldSeparator: string,
  lineSeparator: string,
  fieldProcessor: (field: ValueType) => string,
  inputObjectArray: T[]
): string =>
  pipe<T[], ReturnType<typeof convertToMatrix>, string>(
    convertToMatrix,
    processMatrixToOutputString(fieldSeparator, lineSeparator, fieldProcessor)
  )(inputObjectArray)

const processObjectArray = curry(
  <T extends ArbitraryObjectType>(
    fieldSeparator: string,
    lineSeparator: string,
    fieldProcessor: (field: ValueType) => string,
    inputObjectArray: T[]
  ): Either<string, string> =>
    isEmptyArray(inputObjectArray)
      ? left("inputObjectArray.length must have a length greater than zero")
      : right(
          doProcess(
            fieldSeparator,
            lineSeparator,
            fieldProcessor,
            inputObjectArray
          )
        )
)

export default processObjectArray
