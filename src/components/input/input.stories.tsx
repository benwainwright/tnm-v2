import { Story, Meta } from "@storybook/react"

import Input, { InputProps } from "./input"

export default {
  title: "atoms/Input",
  component: Input,
} as Meta

const Template: Story<InputProps> = args => <Input {...args} />

export const InputStory = Template.bind({})

InputStory.args = {
  label: "Some Field",
  value: "",
}
