import Login from "./login"
import { Layout } from "@common/components/containers"
import { shallow } from "enzyme"
import { LoginBox } from "../components/molecules"

describe("The login page", () => {
  it("renders everything within the main layout", () => {
    const wrapper = shallow(<Login />)

    expect(wrapper.find(Layout)).toHaveLength(1)
  })

  it("renders a login box", () => {
    const wrapper = shallow(<Login />)

    expect(wrapper.find(LoginBox)).toHaveLength(1)
  })
})
