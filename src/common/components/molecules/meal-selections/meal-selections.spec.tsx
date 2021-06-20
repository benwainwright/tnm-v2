import { shallow, mount } from "enzyme"
import MealSelections from "./meal-selections"
import { MealCounter, QuantityStepper } from "@common/components/molecules"
import { act } from "react-dom/test-utils"

describe("The <MealSelections> component", () => {
  it("renders without errors", () => {
    shallow(
      <MealSelections
        mealsAvailable={[]}
        breakfastsAvailable={[]}
        snacksAvailable={[]}
        maxMeals={4}
        maxSnacks={0}
        maxBreakfasts={0}
      />
    )
  })

  it("renders each of the meals into a meals into a <MealCounter />", () => {
    const wrapper = shallow(
      <MealSelections
        breakfastsAvailable={[]}
        snacksAvailable={[]}
        maxSnacks={0}
        maxBreakfasts={0}
        mealsAvailable={[
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
        maxMeals={4}
      />
    )

    expect(
      wrapper
        .find(MealCounter)
        .findWhere((counter) => counter.prop("title") === "foo")
    ).toHaveLength(1)

    expect(
      wrapper
        .find(MealCounter)
        .findWhere((counter) => counter.prop("description") === "baz")
    ).toHaveLength(1)

    expect(
      wrapper
        .find(MealCounter)
        .findWhere((counter) => counter.prop("title") === "foobar")
    ).toHaveLength(1)

    expect(
      wrapper
        .find(MealCounter)
        .findWhere((counter) => counter.prop("description") === "bazBash")
    ).toHaveLength(1)
  })

  it.skip("all the increase buttons are disabled when the maximum is reached", () => {
    const wrapper = mount(
      <MealSelections
        breakfastsAvailable={[]}
        snacksAvailable={[]}
        maxSnacks={0}
        maxBreakfasts={0}
        mealsAvailable={[
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
        maxMeals={3}
      />
    )

    const fooIncrease = wrapper
      .find(MealCounter)
      .findWhere((counter) => counter.prop("title") === "foo")
      .find("button")
      .findWhere((button) => button.prop("aria-label") === "Increase")

    const fooBarIncrease = wrapper
      .find(MealCounter)
      .findWhere((counter) => counter.prop("title") === "foobar")
      .find("button")
      .findWhere((button) => button.prop("aria-label") === "Increase")

    act(() => {
      fooIncrease.at(0).simulate("click")
    })

    act(() => {
      fooIncrease.at(0).simulate("click")
    })

    act(() => {
      fooBarIncrease.at(0).simulate("click")
    })

    expect(fooIncrease.at(0).prop("disabled")).toBeTrue()
    expect(fooBarIncrease.at(0).prop("disabled")).toBeTrue()
  })

  it("Displays a list of quantity-steppers for selected meals when some of the selectors are clicked", () => {
    const wrapper = mount(
      <MealSelections
        breakfastsAvailable={[]}
        snacksAvailable={[]}
        mealsAvailable={[
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
        maxMeals={3}
        maxSnacks={0}
        maxBreakfasts={0}
      />
    )

    const fooIncrease = wrapper
      .find(MealCounter)
      .findWhere((counter) => counter.prop("title") === "foo")
      .find("button")
      .findWhere((button) => button.prop("aria-label") === "Increase")

    const fooBarIncrease = wrapper
      .find(MealCounter)
      .findWhere((counter) => counter.prop("title") === "foobar")
      .find("button")
      .findWhere((button) => button.prop("aria-label") === "Increase")

    act(() => {
      fooIncrease.at(0).simulate("click")
    })

    act(() => {
      fooIncrease.at(0).simulate("click")
    })

    act(() => {
      fooBarIncrease.at(0).simulate("click")
    })

    expect(wrapper.find(QuantityStepper)).toHaveLength(3)
    expect(
      wrapper
        .find(QuantityStepper)
        .findWhere((stepper) => stepper.prop("label") === "foo")
    ).toHaveLength(1)
  })
})
