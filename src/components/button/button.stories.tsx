import { Story, Meta } from "@storybook/react"

import Button, { ButtonProps } from "./button"

export default {
  title: "atoms/Button",
  component: Button,
  argTypes: {
    primary: { name: "Primary", type: "boolean", defaultValue: false },
    color: { name: "Color", type: "string", defaultValue: undefined },
  },
} as Meta

const Template: Story<ButtonProps> = args => <Button {...args}>Click Me</Button>

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
}
