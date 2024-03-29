import { shallow } from "enzyme"
import Button from "./button"
import { BUTTON_BLACK } from "../../../config"
import renderer from "react-test-renderer"

describe("The button component", () => {
  it("should render its children", () => {
    const wrapper = shallow(<Button>Children</Button>)

    expect(wrapper.text()).toInclude("Children")
  })

  describe("if no primary color is passed in", () => {
    it("should be black with a black border and white text if set to primary", () => {
      const button = renderer.create(<Button primary />).toJSON()

      expect(button).toHaveStyleRule("background", BUTTON_BLACK)
      expect(button).toHaveStyleRule("color", "white")
      expect(button).toHaveStyleRule("border", `1px solid ${BUTTON_BLACK}`)
    })

    it("should have a white background with no border and black text if not set to primary", () => {
      const button = renderer.create(<Button />).toJSON()

      expect(button).toHaveStyleRule("background", "white")
      expect(button).toHaveStyleRule("color", BUTTON_BLACK)
      expect(button).toHaveStyleRule("border", `0`)
      expect(button).toHaveStyleRule("text-decoration", "underline")
    })
  })

  describe("if a color is passed in", () => {
    it("should be red with a red border and white text if set to primary and red is passed in the color prop", () => {
      const button = renderer
        .create(<Button primary color="#FF0000" />)
        .toJSON()

      expect(button).toHaveStyleRule("background", "#FF0000")
      expect(button).toHaveStyleRule("color", "white")
      expect(button).toHaveStyleRule("border", `1px solid #FF0000`)
    })

    it("should have a white background with no border and black text if not set to primary", () => {
      const button = renderer.create(<Button color="#FF0000" />).toJSON()

      expect(button).toHaveStyleRule("background", "white")
      expect(button).toHaveStyleRule("color", "#FF0000")
      expect(button).toHaveStyleRule("border", `0`)
      expect(button).toHaveStyleRule("text-decoration", "underline")
    })
  })
})
