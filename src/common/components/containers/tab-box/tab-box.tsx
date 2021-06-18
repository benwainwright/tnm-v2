import {
  FC,
  useState,
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react"
import { TabProps } from "./tab"
import TabButton from "./tab-button"

import styled from "@emotion/styled"

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 500px;
  border: 1px solid black;
  margin-top: -1px;
`

const ButtonRow = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

interface TabBoxProps {}

const isTab = (node: ReactNode): node is ReactElement<TabProps> =>
  isValidElement(node) && "tabTitle" in (node as ReactElement<TabProps>).props

type ExcludesUndefined = <T>(x: T | undefined) => x is T

const getTabs = (nodes: ReactNode): ReactElement<TabProps>[] =>
  Children.map<ReactElement<TabProps> | undefined, ReactNode>(nodes, (node) =>
    isTab(node) ? node : undefined
  )?.filter((Boolean as unknown) as ExcludesUndefined) ?? []

const TabBox: FC<TabBoxProps> = (props) => {
  const [tabIndex, setTabIndex] = useState(0)
  const tabs = getTabs(props.children)
  const buttons = tabs.map((tab, index) => (
    <TabButton
      tabListLength={tabs.length}
      key={index}
      onClick={() => setTabIndex(index)}
      active={tabIndex === index}
    >
      {tab.props.tabTitle}
    </TabButton>
  ))
  return (
    <Flex>
      <ButtonRow>{buttons}</ButtonRow>
      {/* eslint-disable-next-line security/detect-object-injection */}
      {tabs[tabIndex]}
    </Flex>
  )
}

export default TabBox
