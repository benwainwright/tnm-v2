import { Story, Meta } from "@storybook/react"

import LoginAndRegisterBox from "./login-and-register-box"

export default {
  title: "molecules/LoginBox",
  component: LoginAndRegisterBox,
  argTypes: { onLogin: { action: "clicked", errors: { control: "array" } } },
} as Meta

const Template: Story = (args) => <LoginAndRegisterBox {...args} />

export const LoginStory = Template.bind({})

export const LoginStoryWithErrors = Template.bind({})
LoginStoryWithErrors.args = {
  errors: [{ message: "Incorrect Password" }],
}
