import { shallow } from "enzyme"
import MealCounter from "./meal-counter"
import { QuantityStepper } from "@common/components/molecules"

describe("The <MealCounter> component", () => {
  it("renders without errors", () => {
    shallow(<MealCounter title="foo" description="bar" />)
  })

  it("renders the title", () => {
    const wrapper = shallow(<MealCounter title="foo" description="bar" />)

    expect(wrapper.text()).toInclude("foo")
  })

  it("renders the description", () => {
    const wrapper = shallow(<MealCounter title="foo" description="bar" />)

    expect(wrapper.text()).toInclude("bar")
  })

  it("passes the value, max, min and onChange through to the quantity-stepper", () => {
    const onChange = jest.fn()
    const wrapper = shallow(
      <MealCounter
        title="foo"
        description="bar"
        min={2}
        max={4}
        value={3}
        onChange={onChange}
      />
    )

    const stepper = wrapper.find(QuantityStepper)

    expect(stepper.prop("max")).toEqual(4)
    expect(stepper.prop("min")).toEqual(2)
    expect(stepper.prop("value")).toEqual(3)
    expect(stepper.prop("onChange")).toEqual(onChange)
  })
})
