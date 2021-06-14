import { Story, Meta } from "@storybook/react"
import MenuIcon from "../../../assets/images/icons/menu.svg"

import IconButton, { IconButtonProps } from "./icon-button"

export default {
  title: "atoms/IconButton",
  component: IconButton,
} as Meta

const Template: Story<IconButtonProps> = (args) => {
  return <IconButton ariaLabel="Icon Button" icon={MenuIcon} />
}

export const Primary = Template.bind({})
