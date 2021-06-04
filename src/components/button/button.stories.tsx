import { Story, Meta } from "@storybook/react"

import Button, { ButtonProps } from "./button"

export default {
  title: "TNM/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta

const Template: Story<ButtonProps> = args => <Button {...args}>Click Me</Button>

export const Primary = Template.bind({})
Primary.args = {}
