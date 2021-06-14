import QuantityStepper from "./quantity-stepper"
import { shallow } from "enzyme"
import { IconButton } from "@common/components/atoms"
import { act } from "react-dom/test-utils"

describe("Quantity stepper", () => {
  it("displays 0 if there is no value", () => {
    const wrapper = shallow(<QuantityStepper />)
    expect(wrapper.text()).toInclude("0")
  })

  it("Displays the value passed into the value prop", () => {
    const wrapper = shallow(<QuantityStepper value={3} />)
    expect(wrapper.text()).toInclude("3")

    const wrapper2 = shallow(<QuantityStepper value={5} />)
    expect(wrapper2.text()).toInclude("5")
  })

  it("fires an onChange event with the incremented value if the plus button is clicked", () => {
    const onChange = jest.fn()
    const wrapper = shallow(<QuantityStepper value={3} onChange={onChange} />)

    act(() => {
      wrapper
        .find(IconButton)
        .findWhere((button) => button.prop("ariaLabel") === "Increase")
        .simulate("click")
    })

    expect(onChange).toHaveBeenCalledWith(4)
  })

  it("first the onChange event with the decremented value if the minus button is clicked", () => {
    const onChange = jest.fn()
    const wrapper = shallow(<QuantityStepper value={3} onChange={onChange} />)

    act(() => {
      wrapper
        .find(IconButton)
        .findWhere((button) => button.prop("ariaLabel") === "Decrease")
        .simulate("click")
    })

    expect(onChange).toHaveBeenCalledWith(2)
  })

  it("disables the plus button if the max value is reached", () => {
    const wrapper = shallow(<QuantityStepper value={6} max={6} />)
    const increaseButton = wrapper
      .find(IconButton)
      .findWhere((button) => button.prop("ariaLabel") === "Increase")

    expect(increaseButton.prop("disabled")).toEqual(true)
  })

  it("enables the plus button if the max value is not reached", () => {
    const wrapper = shallow(<QuantityStepper value={5} max={6} />)
    const increaseButton = wrapper
      .find(IconButton)
      .findWhere((button) => button.prop("ariaLabel") === "Increase")

    expect(increaseButton.prop("disabled")).toEqual(false)
  })

  it("disables the minus button if the min value is reached", () => {
    const wrapper = shallow(<QuantityStepper value={3} min={3} />)
    const increaseButton = wrapper
      .find(IconButton)
      .findWhere((button) => button.prop("ariaLabel") === "Decrease")

    expect(increaseButton.prop("disabled")).toEqual(true)
  })

  it("enables the plus button if the min value is not reached", () => {
    const wrapper = shallow(<QuantityStepper value={4} min={3} />)
    const increaseButton = wrapper
      .find(IconButton)
      .findWhere((button) => button.prop("ariaLabel") === "Decrease")

    expect(increaseButton.prop("disabled")).toEqual(false)
  })
})
