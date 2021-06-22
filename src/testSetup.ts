import "jest-extended"
import "jest-enzyme"
import "@testing-library/jest-dom/extend-expect"

import Enzyme from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"

import { createSerializer, matchers } from "@emotion/jest"

expect.extend(matchers)

Enzyme.configure({ adapter: new Adapter() })

expect.addSnapshotSerializer(createSerializer())
