import { Story, Meta } from "@storybook/react"

import LoginBox, { LoginBoxProps } from "./login-box"

export default {
  title: "molecules/LoginBox",
  component: LoginBox,
  argTypes: { onLogin: { action: "clicked", errors: { control: "array" } } },
} as Meta

const Template: Story<LoginBoxProps> = (args) => <LoginBox {...args} />

export const LoginStory = Template.bind({})

export const LoginStoryWithErrors = Template.bind({})
LoginStoryWithErrors.args = {
  errors: [{ message: "Incorrect Password" }],
}
