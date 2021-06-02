import { FC } from "react"

import styled from "@emotion/styled"
import TnmHeader from "../images/TNM-Header.svg"

const HeaderUnorderedList = styled("ul")`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 0;
  height: 100%;
  align-items: center;
`

const TheNutritionistLogo = styled("a")`
  background: url(${TnmHeader});
  max-width: 315px;
  width: 100%;
  height: 34px;
  display: block;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
`

const HeaderListItem = styled("li")`
  list-style: none;
  margin: 0;
`

const DesktopHeader: FC = () => (
  <HeaderUnorderedList>
    <HeaderListItem>Our Story</HeaderListItem>
    <HeaderListItem>Why Choose Us</HeaderListItem>
    <HeaderListItem>
      <TheNutritionistLogo href="/" />
    </HeaderListItem>
    <HeaderListItem>The Plans</HeaderListItem>
  </HeaderUnorderedList>
)

export default DesktopHeader
