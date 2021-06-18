import { Story, Meta } from "@storybook/react"

import TabBox from "./tab-box"
import Tab from "./tab"

export default {
  title: "containers/TabBox",
  component: TabBox,
} as Meta

const Template: Story = (args) => (
  <TabBox {...args}>
    <Tab tabTitle="Tab One">
      <p>Contents of one</p>
    </Tab>
    <Tab tabTitle="Tab Two">
      <p>Contents of two</p>
    </Tab>
  </TabBox>
)

export const ExampleTabBox = Template.bind({})
