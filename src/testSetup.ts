import "jest-extended"
import "jest-enzyme"
import "jest-styled-components"

import Enzyme from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"

import { createSerializer } from "@emotion/jest"

Enzyme.configure({ adapter: new Adapter() })

expect.addSnapshotSerializer(
  createSerializer({
    classNameReplacer(className, index) {
      return `sc-emotion-${index}`
    },
  })
)
