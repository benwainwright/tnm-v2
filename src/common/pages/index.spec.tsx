import Layout from "../components/layout"
import { shallow } from "enzyme"
import IndexPage from "./index"

describe("The index page", () => {
  it("renders everything within the main layout", () => {
    const wrapper = shallow(<IndexPage />)

    expect(wrapper.find(Layout)).toHaveLength(1)
  })
})
