import { shallow } from "enzyme"
import Layout from "./layout"
import Header from "./header"

describe("the layout component", () => {
  it("renders a header", () => {
    const wrapper = shallow(<Layout />)
    expect(wrapper.containsMatchingElement(<Header />)).toEqual(true)
  })

  it("renders its children", () => {
    const wrapper = shallow(
      <Layout>
        <p>Child Node</p>
      </Layout>
    )
    expect(wrapper.text()).toInclude("Child Node")
  })
})
