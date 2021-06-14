import IconButton from "./icon-button"
import MenuIcon from "../../../../images/icons/menu.inline.svg"
import { shallow } from "enzyme"

describe("the icon button", () => {
  it("should render a button component", () => {
    const icon = jest.fn()
    const wrapper = shallow(<IconButton icon={icon} />)
    expect(wrapper.find("button")).toHaveLength(1)
  })

  it("should pass the onclick and disabled prop", () => {
    const icon = jest.fn()
    const onClick = jest.fn()
    const wrapper = shallow(
      <IconButton icon={icon} onClick={onClick} disabled={false} />
    )

    expect(wrapper.find("button").prop("onClick")).toEqual(onClick)

    expect(wrapper.find("button").prop("disabled")).toEqual(false)
  })
})
