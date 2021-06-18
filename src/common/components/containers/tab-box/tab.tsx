import { FC } from "react"
import styled from "@emotion/styled"

export interface TabProps {
  tabTitle: string
}

const TabContents = styled.div`
  padding: 1.5rem 5rem 3rem 5rem;
`

const Tab: FC<TabProps> = (props) => {
  return <TabContents>{props.children}</TabContents>
}

export default Tab
