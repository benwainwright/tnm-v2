import { shallow } from "enzyme"
import { act } from "react-dom/test-utils"
import TabBox from "./tab-box"
import TabButton from "./tab-button"
import Tab from "./tab"

describe("The <TabBox> component", () => {
  it("renders without errors", () => {
    shallow(<TabBox />)
  })

  it("renders the first tab by default", () => {
    const wrapper = shallow(
      <TabBox>
        <Tab tabTitle="one">One</Tab>
        <Tab tabTitle="two">Two</Tab>
      </TabBox>
    )
    expect(
      wrapper.findWhere((node) => node.prop("tabTitle") === "one")
    ).toHaveLength(1)
  })

  it("doesn't render the second tab by default", () => {
    const wrapper = shallow(
      <TabBox>
        <Tab tabTitle="one">One</Tab>
        <Tab tabTitle="two">Two</Tab>
      </TabBox>
    )

    expect(
      wrapper.findWhere((node) => node.prop("tabTitle") === "two")
    ).toHaveLength(0)
  })

  it("renders a list of buttons for each tab", () => {
    const wrapper = shallow(
      <TabBox>
        <Tab tabTitle="oneTitle">One</Tab>
        <Tab tabTitle="twoTitle">Two</Tab>
      </TabBox>
    )

    expect(
      wrapper
        .find(TabButton)
        .findWhere((button) => button.prop("children") === "oneTitle")
    ).toHaveLength(1)

    expect(
      wrapper
        .find(TabButton)
        .findWhere((button) => button.prop("children") === "twoTitle")
    ).toHaveLength(1)
  })

  it("shows the second tab when the second button is clicked", () => {
    const wrapper = shallow(
      <TabBox>
        <Tab tabTitle="oneTitle">One</Tab>
        <Tab tabTitle="twoTitle">Two</Tab>
      </TabBox>
    )

    act(() => {
      wrapper
        .find(TabButton)
        .findWhere((button) => button.prop("children") === "twoTitle")
        .simulate("click")
    })

    expect(
      wrapper.findWhere((node) => node.prop("tabTitle") === "twoTitle")
    ).toHaveLength(1)
  })

  it("hides the second tab when the second button is clicked", () => {
    const wrapper = shallow(
      <TabBox>
        <Tab tabTitle="oneTitle">One</Tab>
        <Tab tabTitle="twoTitle">Two</Tab>
      </TabBox>
    )

    act(() => {
      wrapper
        .find(TabButton)
        .findWhere((button) => button.prop("children") === "twoTitle")
        .simulate("click")
    })

    expect(
      wrapper.findWhere((node) => node.prop("tabTitle") === "oneTitle")
    ).toHaveLength(0)
  })

  it("The first tab button is 'active' by default", () => {
    const wrapper = shallow(
      <TabBox>
        <Tab tabTitle="oneTitle">One</Tab>
        <Tab tabTitle="twoTitle">Two</Tab>
      </TabBox>
    )

    expect(
      wrapper
        .find(TabButton)
        .at(0)
        .findWhere((button) => button.prop("active"))
    ).toHaveLength(1)
  })

  it("The second tab button is 'active' when clicked", () => {
    const wrapper = shallow(
      <TabBox>
        <Tab tabTitle="oneTitle">One</Tab>
        <Tab tabTitle="twoTitle">Two</Tab>
      </TabBox>
    )

    act(() => {
      wrapper
        .find(TabButton)
        .findWhere((button) => button.prop("children") === "twoTitle")
        .simulate("click")
    })

    expect(
      wrapper
        .find(TabButton)
        .at(1)
        .findWhere((button) => button.prop("active"))
    ).toHaveLength(1)
  })
})
