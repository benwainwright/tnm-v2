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

const NutritionAndAllergy = styled.p`
  font-family: "IBM Plex mono", monospace;
`

const Divider = styled.hr`
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='3' stroke-dasharray='4%2c 8' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
  width: 100%;
  height: 1px;
  margin: 0;
  border: 0;
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
      <Divider />
      <NutritionAndAllergy>Nutrution & Allergy Info</NutritionAndAllergy>
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
