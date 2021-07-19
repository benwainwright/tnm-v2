import { isValidElement, ReactElement, ReactNode, Children } from "react"

export const recursiveTransform = (
  nodes: ReactNode,
  func: (element: ReactElement) => ReactNode
): ReactNode =>
  Children.map(nodes, (node) => {
    return isValidElement(node)
      ? func({
          ...node,
          props: {
            ...node.props,
            children: recursiveTransform(node.props.children, func),
          },
        })
      : node
  })

interface AddNewPropsReturnVal {
  props: { [key: string]: unknown }
  apply?: boolean
}

export const addNewProps = (
  nodes: ReactNode,
  newProps: (element: ReactElement) => AddNewPropsReturnVal
) =>
  recursiveTransform(nodes, (element) => {
    return newProps(element).apply ? (
      <element.type {...{ ...element.props, ...newProps(element).props }} />
    ) : (
      <element.type {...element.props} />
    )
  })
