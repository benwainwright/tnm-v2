import { shallow } from "enzyme"

import LoginAndRegisterBox from "./login-and-register-box"

describe("The login and register box", () => {
  it("renders without error", () => {
    shallow(<LoginAndRegisterBox />)
  })
})
