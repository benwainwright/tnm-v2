import IconButton from "./icon-button"
import { shallow } from "enzyme"

describe("the icon button", () => {
  it("should render a button component", () => {
    const icon = "icon"
    const wrapper = shallow(<IconButton ariaLabel="icon" icon={icon} />)
    expect(wrapper.find("button")).toHaveLength(1)
  })

  it("should pass the onclick, disabled and aria-label prop", () => {
    const icon = "icon"
    const onClick = jest.fn()
    const wrapper = shallow(
      <IconButton
        icon={icon}
        onClick={onClick}
        disabled={false}
        ariaLabel="foo-label"
      />
    )

    expect(wrapper.find("button").prop("onClick")).toEqual(onClick)

    expect(wrapper.find("button").prop("disabled")).toEqual(false)

    expect(wrapper.find("button").prop("aria-label")).toEqual("foo-label")
  })
})
