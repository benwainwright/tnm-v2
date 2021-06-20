import { FC } from "react"
import { QuantityStepper } from "@common/components/molecules"
import styled from "@emotion/styled"

export interface MealCounterProps {
  title: string
  description: string
  value?: number
  onChange?: (newValue: number) => void
  max?: number
  min?: number
}

const Header = styled.h3`
  font-family: "Acumin Pro", Arial, sans-serif;
  font-size: 1.7rem;
  margin: 0;
`

const Description = styled.p`
  font-family: "IBM Plex Serif", "Times New Roman", serif;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  text-align: center;
  align-items: center;
`

const MealCounter: FC<MealCounterProps> = (props) => {
  return (
    <Container>
      <Header>{props.title}</Header>
      <Description>{props.description}</Description>
      <QuantityStepper
        onChange={props.onChange}
        value={props.value}
        min={props.min}
        max={props.max}
      />
    </Container>
  )
}

export default MealCounter
