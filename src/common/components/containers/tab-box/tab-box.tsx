import {
  FC,
  useState,
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react"
import { TabProps } from "./tab"

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
    <button key={index} onClick={() => setTabIndex(index)}>
      {tab.props.tabTitle}
    </button>
  ))
  return (
    <div>
      <div>{buttons}</div>
      {/* eslint-disable-next-line security/detect-object-injection */}
      {tabs[tabIndex]}
    </div>
  )
}

export default TabBox
