import { FC, Fragment, Dispatch, SetStateAction } from "react"
import { Meal } from "./meal"
import { SelectedThings } from "./selected-things"
import { QuantityStepper } from "@common/components/molecules"
import styled from "@emotion/styled"

interface BasketProps {
  available: Meal[]
  itemWord: string
  itemWordPlural: string
  selectedMeals: SelectedThings
  setSelected: Dispatch<SetStateAction<SelectedThings>>
  max: number
}

const toTitleCase = (string: string) => {
  return string.replace(/\w\S*/g, (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  })
}

const makeBasketItems = (
  selectedThings: SelectedThings,
  available: Meal[],
  setSelected: Dispatch<SetStateAction<SelectedThings>>,
  max: number,
  total: number
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
        max={max - total + selectedThings[thing.id ?? ""]}
        onChange={(newValue: number) =>
          setSelected({ ...selectedThings, [thing?.id ?? ""]: newValue })
        }
      />
    ))

const BasketHeader = styled.h3`
  font-family: "Acumin Pro", Arial, sans-serif;
  font-size: 1.3rem;
  font-weight: bold;
  margin: 1rem 0 0 0;
  padding: 0;
`

const BasketRemaining = styled.p`
  font-family: "Acumin Pro", Arial, sans-serif;
`

const Basket: FC<BasketProps> = (props) => {
  const totalSelected = Object.entries(props.selectedMeals).reduce(
    (accum, item) => accum + item[1],
    0
  )

  if (totalSelected === 0) {
    return null
  }

  const itemWord = totalSelected > 1 ? props.itemWordPlural : props.itemWord
  const header = toTitleCase(`${totalSelected} ${itemWord} Selected`)
  return (
    <Fragment>
      <BasketHeader>{header}</BasketHeader>
      <BasketRemaining>
        {props.max - totalSelected} {itemWord} remaining
      </BasketRemaining>
      {makeBasketItems(
        props.selectedMeals,
        props.available,
        props.setSelected,
        props.max,
        totalSelected
      )}
    </Fragment>
  )
}

export default Basket
