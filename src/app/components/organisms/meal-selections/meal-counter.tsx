import { FC } from "react"
import { QuantityStepper } from "@app/components/molecules"
import { uniqueId } from "lodash"
import { ParagraphText } from "@app/components/atoms"
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
const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 20rem;
  text-align: center;
  align-items: center;
`

const MealCounter: FC<MealCounterProps> = props => {
  const headerId = uniqueId()
  return (
    <Container aria-labelledby={headerId}>
      <Header id={headerId}>{props.title}</Header>
      <ParagraphText>{props.description}</ParagraphText>
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
