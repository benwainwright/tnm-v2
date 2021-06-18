import { Story, Meta } from "@storybook/react"

import TabBox from "./tab-box"
import Tab from "./tab"

export default {
  title: "containers/TabBox",
  component: TabBox,
} as Meta

const Template: Story = (args) => (
  <TabBox {...args}>
    <Tab tabTitle="Login">
      <p>Contents of one</p>
    </Tab>
    <Tab tabTitle="Register">
      <p>Contents of two</p>
    </Tab>
  </TabBox>
)

export const ExampleTabBox = Template.bind({})
