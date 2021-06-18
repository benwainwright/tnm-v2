import { FC, Fragment } from "react"

export interface TabProps {
  tabTitle: string
}

const Tab: FC<TabProps> = (props) => {
  return <Fragment>{props.children}</Fragment>
}

export default Tab
