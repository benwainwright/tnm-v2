import { FC, useState, Dispatch, SetStateAction } from "react"
import { MealCounter, QuantityStepper } from "@common/components/molecules"
import { TabBox, Tab } from "@common/components/containers"
import TabButton from "./tab-button"
import styled from "@emotion/styled"

interface Meal {
  id: string
  title: string
  description: string
}

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

const FlexBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
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

const makeMealList = (
  title: string,
  things: Meal[],
  selectedThings: { [id: string]: number },
  max: number,
  total: number,
  setSelectedThings: Dispatch<SetStateAction<{ [id: string]: number }>>
) => (
  <Tab tabTitle={title}>
    <FlexBox>
      {things.map((thing) => (
        <MealCounter
          key={thing.id}
          title={thing.title}
          description={thing.description}
          value={selectedThings[thing.id]}
          min={0}
          max={max - total + selectedThings[thing.id]}
          onChange={(newValue: number) =>
            setSelectedThings({
              ...selectedThings,
              [thing.id]: newValue,
            })
          }
        />
      ))}
    </FlexBox>
  </Tab>
)

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
          {makeMealList(
            "Meals",
            props.mealsAvailable,
            selectedMeals,
            props.maxMeals,
            totalMeals,
            setSelectedMeals
          )}
          {makeMealList(
            "Breakfasts",
            props.breakfastsAvailable,
            selectedBreakfasts,
            props.maxBreakfasts,
            totalBreakfasts,
            setSelectedBreakfasts
          )}
          {makeMealList(
            "Snacks",
            props.snacksAvailable,
            selectedSnacks,
            props.maxSnacks,
            totalSnacks,
            setSelectedSnacks
          )}
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
