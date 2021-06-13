import { Story, Meta } from "@storybook/react"

import ChallengeForm, { ChallengeFormProps } from "./challenge-form"

export default {
  title: "containers/ChallengeForm",
  component: ChallengeForm,
} as Meta

const Template: Story<ChallengeFormProps<{}>> = (args) => (
  <ChallengeForm {...args}>
    <p>Some content</p>
  </ChallengeForm>
)

export const ChallengeFormStory = Template.bind({})

ChallengeFormStory.args = {
  header: "A Challenge",
}
