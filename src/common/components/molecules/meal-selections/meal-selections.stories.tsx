import { Meta, Story } from "@storybook/react"

import MealSelectionsComponent, { MealSelectionsProps } from "./meal-selections"

export default {
  title: "molecules/Meal Selections",
  component: MealSelectionsComponent,
} as Meta

const Template: Story<MealSelectionsProps> = (args) => (
  <MealSelectionsComponent {...args} />
)

export const MealSelections = Template.bind({})

MealSelections.args = {
  maxMeals: 4,
  maxBreakfasts: 2,
  maxSnacks: 3,
  snacksAvailable: [],
  breakfastsAvailable: [
    {
      id: "4",
      title: "Some cool ass Granola",
      description: "Yeah its got all the ",
    },
  ],
  mealsAvailable: [
    {
      id: "1",
      title: "French toast, fruit & yoghurt",
      description:
        "French toast, fresh seasonal fruit, greek yoghurt and mint garnish",
    },
    {
      id: "2",
      title: "A really eggy Omelette with cress",
      description: "Eggs mashed up till they are dead with cheese and things",
    },

    {
      id: "3",
      title: "Salad, like, really really green salad",
      description:
        "A lovely greek salad with cheese and stuff and all the cucumber and feta",
    },

    {
      id: "4",
      title: "Salad, like, really really green salad",
      description:
        "A lovely greek salad with cheese and stuff and all the cucumber and feta",
    },
  ],
}
