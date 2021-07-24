import { FC } from "react"
import styled from "@emotion/styled"

export interface TabProps {
  tabTitle: string
}

const TabContents = styled.div`
  width: 100%;
`

const Tab: FC<TabProps> = (props) => {
  return <TabContents role="tabpanel">{props.children}</TabContents>
}

export default Tab
