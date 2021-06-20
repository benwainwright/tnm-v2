import { FC } from "react"
import { Meal } from "./meal"
import { SelectedThings } from "./selected-things"
import { QuantityStepper } from "@common/components/molecules"
import styled from "@emotion/styled"

interface BasketProps {
  available: Meal[]
  selectedMeals: SelectedThings
  selectedSnacks: SelectedThings
  selectedBreakfasts: SelectedThings
}

const SelectedBox = styled.div`
  padding: 1rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const makeBasket = (selectedThings: SelectedThings, available: Meal[]) =>
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

const Basket: FC<BasketProps> = (props) => {
  return (
    <SelectedBox>
      {makeBasket(props.selectedMeals, props.available)}
      {makeBasket(props.selectedBreakfasts, props.available)}
      {makeBasket(props.selectedSnacks, props.available)}
    </SelectedBox>
  )
}

export default Basket
