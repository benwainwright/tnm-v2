import QuantityStepper from "./quantity-stepper"
import { shallow } from "enzyme"
import { IconButton } from "@common/components/atoms"
import { act } from "react-dom/test-utils"
import { render, screen } from "@testing-library/react"

test("Quantity stepper displays a 0 if there is no value", () => {
  render(<QuantityStepper />)
  expect(screen.getByRole("spinbutton")).toHaveTextContent("0")
})

test("Quantity stepper displays the value passed into the value prop", () => {
  const { rerender } = render(<QuantityStepper value={3} />)
  expect(screen.getByRole("spinbutton")).toHaveTextContent("3")

  rerender(<QuantityStepper value={5} />)
  expect(screen.getByRole("spinbutton")).toHaveTextContent("5")
})

test("Quantity renders the label if there is one", () => {
  render(<QuantityStepper label="Foo" />)
  expect(screen.queryByText("Foo")).toBeInTheDocument()
})

describe("Quantity stepper", () => {
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
    const onChange = jest.fn()
    const wrapper = shallow(
      <QuantityStepper value={6} max={6} onChange={onChange} />
    )

    const increaseButton = wrapper
      .find(IconButton)
      .findWhere((button) => button.prop("ariaLabel") === "Increase")

    act(() => {
      increaseButton.simulate("click")
    })

    expect(onChange).not.toHaveBeenCalled()
    expect(increaseButton.prop("disabled")).toBeTrue()
  })

  it("enables the plus button if the max value is not reached", () => {
    const onChange = jest.fn()
    const wrapper = shallow(
      <QuantityStepper value={5} max={6} onChange={onChange} />
    )
    const increaseButton = wrapper
      .find(IconButton)
      .findWhere((button) => button.prop("ariaLabel") === "Increase")

    act(() => {
      increaseButton.simulate("click")
    })

    expect(onChange).toHaveBeenCalled()
    expect(increaseButton.prop("disabled")).not.toBeTrue()
  })

  it("disables the minus button if the min value is reached", () => {
    const onChange = jest.fn()
    const wrapper = shallow(
      <QuantityStepper value={3} min={3} onChange={onChange} />
    )

    const decreaseButton = wrapper
      .find(IconButton)
      .findWhere((button) => button.prop("ariaLabel") === "Decrease")

    act(() => {
      decreaseButton.simulate("click")
    })

    expect(onChange).not.toHaveBeenCalled()
    expect(decreaseButton.prop("disabled")).toBeTrue()
  })

  it("enables the plus button if the min value is not reached", () => {
    const onChange = jest.fn()
    const wrapper = shallow(
      <QuantityStepper value={2} min={3} onChange={onChange} />
    )

    const decreaseButton = wrapper
      .find(IconButton)
      .findWhere((button) => button.prop("ariaLabel") === "Decrease")

    act(() => {
      decreaseButton.simulate("click")
    })

    expect(decreaseButton.prop("disabled")).not.toBeTrue()
    expect(onChange).toHaveBeenCalled()
  })
})
