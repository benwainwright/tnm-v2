import processFields from "../../process-fields"
import processField from "./process-field"

const process = processFields(",", "\r\n", processField)

export default process
