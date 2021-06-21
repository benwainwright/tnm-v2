import { shallow } from "enzyme"
import RegisterForm from "./register-form"

describe("The <RegisterForm> component", () => {
  it("renders without errors", () => {
    shallow(<RegisterForm onSubmit={() => {}} />)
  })
})
