import { Story, Meta } from "@storybook/react"

import RegisterFormComponent, { RegisterFormProps } from "./register-form"

export default {
  title: "molecules/RegisterForm",
  component: RegisterFormComponent,
} as Meta

const Template: Story<RegisterFormProps> = (args) => (
  <RegisterFormComponent {...args} />
)

export const RegisterForm = Template.bind({})
