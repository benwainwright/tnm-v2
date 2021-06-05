import { mount } from "enzyme"
import { act } from "react-dom/test-utils"

import LoginBox from "./login-box"

describe("The login box", () => {
  it("fires an onlogin event when the login button is clicked containing the form data", () => {
    const onLogin = jest.fn()
    const wrapper = mount(<LoginBox onLogin={onLogin} />)

    act(() => {
      wrapper
        .find("input[name='email']")
        .at(0)
        .simulate("change", { target: { value: "abc@foo.com" } })
    })

    act(() => {
      wrapper
        .find("input[id='password']")
        .at(0)
        .simulate("change", { target: { value: "foopassword" } })
    })

    wrapper.find("button").at(0).simulate("click")

    expect(onLogin).toHaveBeenCalledWith({
      email: "abc@foo.com",
      password: "foopassword",
    })
  })
})
