import { FC } from "react"
import styled from "@emotion/styled"

interface TabButtonProps {
  onClick?: () => void
  active?: boolean
}

const TabButton: FC<TabButtonProps> = (props) => {
  const StyledButton = styled.button`
    font-family: "Acumin Pro", Arial, sans-serif;
    width: calc(100% / 2);
    border: 0;
    cursor: pointer;
    padding: 1rem 3rem;
    font-size: 2rem;

    background: ${props.active ? `white` : `#E3E3E3`};
    border-bottom: ${props.active ? `0` : `1px solid black`};
    &:not(:first-of-type) {
      border-left: 1px solid black;
    }
  `
  StyledButton.displayName = "button"
  return <StyledButton onClick={props.onClick}>{props.children}</StyledButton>
}

export default TabButton
