import { shallow, render } from "enzyme"
import Button from "./button"
import { BUTTON_BLACK } from "../../config"
import renderer from "react-test-renderer"

describe("The button component", () => {
  it("should render its children", () => {
    const wrapper = shallow(<Button>Children</Button>)

    expect(wrapper.text()).toInclude("Children")
  })

  it("should be black with a black border and white text if set to primary", () => {
    const button = renderer.create(<Button />).toJSON()

    expect(button).toHaveStyleRule("background", BUTTON_BLACK)
    expect(button).toHaveStyleRule("color", "white")
    expect(button).toHaveStyleRule("border", `1px solid ${BUTTON_BLACK}`)
  })
})
