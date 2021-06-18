import { shallow } from "enzyme"
import { Input } from "../../atoms"

import LoginAndRegisterBox from "./login-and-register-box"

describe("The login box", () => {
  it("renders an input for email and password", () => {
    const wrapper = shallow(<LoginAndRegisterBox />)

    expect(
      wrapper.find(Input).findWhere((input) => input.prop("name") === "email")
    ).toHaveLength(1)

    expect(
      wrapper
        .find(Input)
        .findWhere((input) => input.prop("name") === "password")
    ).toHaveLength(1)
  })
})
