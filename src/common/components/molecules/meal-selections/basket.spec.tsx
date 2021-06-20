import { shallow, mount } from "enzyme"
import Basket from "./basket"
import { QuantityStepper } from "@common/components/molecules"
import { act } from "react-dom/test-utils"

describe("The <Basket> component", () => {
  it("renders without errors", () => {
    shallow(
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

  it("renders nothing if there is no items selected", () => {
    const wrapper = shallow(
      <Basket
        available={[]}
        itemWord="foo"
        itemWordPlural="foos"
        selectedMeals={{}}
        setSelected={jest.fn()}
        max={0}
      />
    )

    expect(wrapper.type()).toEqual(null)
  })

  it("disables the plus button if the total has reached the max", () => {
    const wrapper = mount(
      <Basket
        setSelected={jest.fn()}
        available={[
          {
            id: "1",
            title: "foo",
            description: "baz",
          },

          {
            id: "2",
            title: "foobar",
            description: "bazBash",
          },
        ]}
        itemWord="foo"
        itemWordPlural="foos"
        selectedMeals={{
          "1": 1,
          "2": 3,
        }}
        max={4}
      />
    )

    const fooIncrease = wrapper
      .find(QuantityStepper)
      .findWhere((counter) => counter.prop("label") === "foo")
      .find("button")
      .findWhere((button) => button.prop("aria-label") === "Increase")

    expect(fooIncrease.at(0).prop("disabled")).toEqual(true)
  })

  it("fires the setSelectedHandler if a quantityStepper button is clicked", () => {
    const setSelected = jest.fn()
    const wrapper = mount(
      <Basket
        available={[
          {
            id: "1",
            title: "foo",
            description: "baz",
          },

          {
            id: "2",
            title: "foobar",
            description: "bazBash",
          },
        ]}
        itemWord="foo"
        itemWordPlural="foos"
        selectedMeals={{
          "1": 1,
          "2": 1,
        }}
        setSelected={setSelected}
        max={4}
      />
    )

    const fooIncrease = wrapper
      .find(QuantityStepper)
      .findWhere((counter) => counter.prop("label") === "foo")
      .find("button")
      .findWhere((button) => button.prop("aria-label") === "Increase")

    act(() => {
      fooIncrease.at(0).simulate("click")
    })

    expect(setSelected).toBeCalledWith({ "1": 2, "2": 1 })
  })
})
