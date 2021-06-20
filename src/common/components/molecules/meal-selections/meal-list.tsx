import { FC, Dispatch, SetStateAction } from "react"
import { MealCounter } from "@common/components/molecules"
import { SelectedThings } from "./selected-things"
import { Meal } from "./meal"
import styled from "@emotion/styled"

interface MealListProps {
  things: Meal[]
  selected: SelectedThings
  setSelected: Dispatch<SetStateAction<SelectedThings>>
  max: number
  overalTotal: number
}

const FlexBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
`

const MealList: FC<MealListProps> = (props) => {
  return (
    <FlexBox>
      {props.things.map((thing) => (
        <MealCounter
          key={thing.id}
          title={thing.title}
          description={thing.description}
          value={props.selected[thing.id]}
          min={0}
          max={props.max - props.overalTotal + props.selected[thing.id]}
          onChange={(newValue: number) =>
            props.setSelected({
              ...props.selected,
              [thing.id]: newValue,
            })
          }
        />
      ))}
    </FlexBox>
  )
}

export default MealList
