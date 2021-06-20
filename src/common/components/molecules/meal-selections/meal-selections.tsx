import { FC, useState } from "react"
import { MealCounter } from "@common/components/molecules"
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
  max: number
}

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

const MealSelections: FC<MealSelectionsProps> = (props) => {
  const [totals, setTotals] = useState(
    Object.fromEntries(props.mealsAvailable.map((meal) => [meal.id, 0]))
  )

  const total = Object.entries(totals).reduce(
    (accum, item) => accum + item[1],
    0
  )

  return (
    <DivContainer>
      <TabBox tabButton={TabButton}>
        <Tab tabTitle="Meals">
          <FlexBox>
            {props.mealsAvailable.map((meal) => (
              <MealCounter
                key={meal.id}
                title={meal.title}
                description={meal.description}
                value={totals[meal.id]}
                min={0}
                max={props.max - total + totals[meal.id]}
                onChange={(newValue: number) =>
                  setTotals({ ...totals, [meal.id]: newValue })
                }
              />
            ))}
          </FlexBox>
        </Tab>
        <Tab tabTitle="Breakfasts"></Tab>
        <Tab tabTitle="Snacks"></Tab>
      </TabBox>
    </DivContainer>
  )
}

export default MealSelections
