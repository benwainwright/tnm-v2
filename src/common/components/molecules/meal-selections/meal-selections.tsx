import { FC, useState } from "react"
import { TabBox, Tab } from "@common/components/containers"
import MealList from "./meal-list"
import TabButton from "./tab-button"
import styled from "@emotion/styled"
import { Meal } from "./meal"
import { SelectedThings } from "./selected-things"
import Basket from "./basket"

export interface MealSelectionsProps {
  mealsAvailable: Meal[]
  breakfastsAvailable: Meal[]
  snacksAvailable: Meal[]
  maxMeals: number
  maxSnacks: number
  maxBreakfasts: number
}

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

const totalThings = (selectedThings: SelectedThings) =>
  Object.entries(selectedThings).reduce((accum, item) => accum + item[1], 0)

const createDefaultSelectedThings = (things: Meal[]) =>
  Object.fromEntries(things.map((thing) => [thing.id, 0]))

const MealSelections: FC<MealSelectionsProps> = (props) => {
  const [selectedMeals, setSelectedMeals] = useState(
    createDefaultSelectedThings(props.mealsAvailable)
  )
  const totalMeals = totalThings(selectedMeals)

  const [selectedBreakfasts, setSelectedBreakfasts] = useState(
    createDefaultSelectedThings(props.breakfastsAvailable)
  )

  const totalBreakfasts = totalThings(selectedBreakfasts)
  const [selectedSnacks, setSelectedSnacks] = useState(
    createDefaultSelectedThings(props.snacksAvailable)
  )
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
        <Basket
          available={[
            ...props.mealsAvailable,
            ...props.snacksAvailable,
            ...props.breakfastsAvailable,
          ]}
          selectedMeals={selectedMeals}
          selectedSnacks={selectedSnacks}
          selectedBreakfasts={selectedBreakfasts}
        />
      </GridParent>
    </DivContainer>
  )
}

export default MealSelections
