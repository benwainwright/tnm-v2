import { isValidElement, ReactElement, ReactNode, Children, FC } from "react"

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

type PropsOf<P> = P extends FC<infer T> ? T : never

interface AddNewPropsReturnVal<P> {
  props: Partial<PropsOf<P>>
  apply?: boolean
}

export const addNewProps = <P,>(
  nodes: ReactNode,
  newProps: (element: ReactElement) => AddNewPropsReturnVal<P>
) =>
  recursiveTransform(nodes, (element) => {
    return newProps(element).apply ? (
      <element.type {...{ ...element.props, ...newProps(element).props }} />
    ) : (
      <element.type {...element.props} />
    )
  })
