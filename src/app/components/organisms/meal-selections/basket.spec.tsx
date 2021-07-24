import { mount } from "enzyme"
import Basket from "./basket"
import { QuantityStepper } from "@app/components/molecules"
import { act } from "react-dom/test-utils"
import { render, screen } from "@testing-library/react"

test("The <Basket> component renders without errors", () => {
  render(
    <Basket
      available={[]}
      itemWord="foo"
      itemWordPlural="foos"
      selectedMeals={{}}
      setSelected={jest.fn()}
      max={0}
    />
  )
})

test("The <Basket> component renders nothing when there is no items selected", () => {
  render(
    <Basket
      available={[]}
      itemWord="foo"
      itemWordPlural="foos"
      selectedMeals={{}}
      setSelected={jest.fn()}
      max={0}
    />
  )

  const spinButtons = screen.queryByRole("spinbutton")
  expect(spinButtons).toBeFalsy()
})

test.skip("The <Basket> component disables the plus button if the total has reached the max", () => {
  render(
    <Basket
      available={[
        {
          id: "1",
          title: "foo-sb",
          description: "baz"
        },

        {
          id: "2",
          title: "foobar-sb",
          description: "bazBash"
        }
      ]}
      itemWord="foo"
      itemWordPlural="foos"
      selectedMeals={{
        1: 2,
        2: 3
      }}
      setSelected={jest.fn()}
      max={4}
    />
  )
})

test.skip("disables the plus button if the total has reached the max", () => {
  const wrapper = mount(
    <Basket
      setSelected={jest.fn()}
      available={[
        {
          id: "1",
          title: "foo",
          description: "baz"
        },

        {
          id: "2",
          title: "foobar",
          description: "bazBash"
        }
      ]}
      itemWord="foo"
      itemWordPlural="foos"
      selectedMeals={{
        "1": 1,
        "2": 3
      }}
      max={4}
    />
  )

  const fooIncrease = wrapper
    .find(QuantityStepper)
    .findWhere(counter => counter.prop("label") === "foo")
    .find("button")
    .findWhere(button => button.prop("aria-label") === "Increase")

  expect(fooIncrease.at(0).prop("disabled")).toEqual(true)
})

test.skip("fires the setSelectedHandler if a quantityStepper button is clicked", () => {
  const setSelected = jest.fn()
  const wrapper = mount(
    <Basket
      available={[
        {
          id: "1",
          title: "foo",
          description: "baz"
        },

        {
          id: "2",
          title: "foobar",
          description: "bazBash"
        }
      ]}
      itemWord="foo"
      itemWordPlural="foos"
      selectedMeals={{
        "1": 1,
        "2": 1
      }}
      setSelected={setSelected}
      max={4}
    />
  )

  const fooIncrease = wrapper
    .find(QuantityStepper)
    .findWhere(counter => counter.prop("label") === "foo")
    .find("button")
    .findWhere(button => button.prop("aria-label") === "Increase")

  act(() => {
    fooIncrease.at(0).simulate("click")
  })

  expect(setSelected).toBeCalledWith({ "1": 2, "2": 1 })
})
