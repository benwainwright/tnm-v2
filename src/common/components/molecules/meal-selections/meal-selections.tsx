import { FC, useState } from "react"
import { QuantityStepper } from "@common/components/molecules"
import { TabBox, Tab } from "@common/components/containers"
import MealList from "./meal-list"
import TabButton from "./tab-button"
import styled from "@emotion/styled"
import { Meal } from "./meal"

export interface MealSelectionsProps {
  mealsAvailable: Meal[]
  breakfastsAvailable: Meal[]
  snacksAvailable: Meal[]
  maxMeals: number
  maxSnacks: number
  maxBreakfasts: number
}

const SelectedBox = styled.div`
  padding: 1rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const GridParent = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 70% 30%;
`

const DivContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 2rem;
`

const totalThings = (selectedThings: { [id: string]: number }) =>
  Object.entries(selectedThings).reduce((accum, item) => accum + item[1], 0)

const makeBasket = (
  selectedThings: { [id: string]: number },
  available: Meal[]
) =>
  Object.entries(selectedThings)
    .filter(([, count]) => count > 0)
    .map(([id, count]) => ({
      ...available.find((thing) => thing.id === id),
      count,
    }))
    .map((thing) => (
      <QuantityStepper
        key={`${thing.id}-basket-item`}
        label={thing.title}
        value={thing.count}
      />
    ))

const createDefaultSelectedThings = (things: Meal[]) =>
  Object.fromEntries(things.map((thing) => [thing.id, 0]))

const MealSelections: FC<MealSelectionsProps> = (props) => {
  const [selectedMeals, setSelectedMeals] = useState(
    createDefaultSelectedThings(props.mealsAvailable)
  )
  const chosenMealBasket = makeBasket(selectedMeals, props.mealsAvailable)
  const totalMeals = totalThings(selectedMeals)

  const [selectedBreakfasts, setSelectedBreakfasts] = useState(
    createDefaultSelectedThings(props.breakfastsAvailable)
  )
  const chosenBreakfastsBasket = makeBasket(
    selectedBreakfasts,
    props.breakfastsAvailable
  )

  const totalBreakfasts = totalThings(selectedBreakfasts)
  const [selectedSnacks, setSelectedSnacks] = useState(
    createDefaultSelectedThings(props.snacksAvailable)
  )
  const chosenSnacksBasket = makeBasket(selectedSnacks, props.snacksAvailable)

  const totalSnacks = totalThings(selectedSnacks)

  return (
    <DivContainer>
      <GridParent>
        <TabBox tabButton={TabButton}>
          <Tab tabTitle="Meals">
            <MealList
              things={props.mealsAvailable}
              selected={selectedMeals}
              setSelected={setSelectedMeals}
              overalTotal={totalMeals}
              max={props.maxMeals}
            />
          </Tab>

          <Tab tabTitle="Breakfasts">
            <MealList
              things={props.breakfastsAvailable}
              selected={selectedBreakfasts}
              setSelected={setSelectedBreakfasts}
              overalTotal={totalBreakfasts}
              max={props.maxBreakfasts}
            />
          </Tab>
          <Tab tabTitle="Snacks">
            <MealList
              things={props.snacksAvailable}
              selected={selectedSnacks}
              setSelected={setSelectedSnacks}
              overalTotal={totalSnacks}
              max={props.maxSnacks}
            />
          </Tab>
        </TabBox>
        <SelectedBox>
          {chosenMealBasket}
          {chosenBreakfastsBasket}
          {chosenSnacksBasket}
        </SelectedBox>
      </GridParent>
    </DivContainer>
  )
}

export default MealSelections
