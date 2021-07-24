import { curry, pipe } from "ramda"
import { ValueType } from "../../types"
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

const escapeQuotes = (field: ValueType) =>
  typeof field === "string" ? field.replace(/"/gu, '""') : ""

const processField = pipe<ValueType, ValueType, ValueType, ValueType, string>(
  convertTypeToString("number"),
  convertTypeToString("boolean"),
  escapeQuotes,
  surroundFieldsWithSpecialCharactersInQuotes([",", '"', "\r\n"])
)

export default processField
