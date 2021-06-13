import { shallow } from "enzyme"
import { Input } from "../../atoms"

import LoginBox from "./login-box"

describe("The login box", () => {
  it("renders an input for email and password", () => {
    const wrapper = shallow(<LoginBox />)

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
