import Hero from "./hero"
import { shallow } from "enzyme"

describe("The hero box", () => {
  it("renders without error", () => {
    shallow(<Hero />)
  })

  it("renders it children", () => {
    const wrapper = shallow(<Hero>Hello!</Hero>)
    expect(wrapper.text()).toContain("Hello!")
  })
})
