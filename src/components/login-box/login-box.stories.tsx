import { Story, Meta } from "@storybook/react"

import LoginBox, { LoginBoxProps } from "./login-box"

export default {
  title: "molecules/LoginBox",
  component: LoginBox,
} as Meta

const Template: Story<LoginBoxProps> = args => <LoginBox {...args} />

export const LoginStory = Template.bind({})
