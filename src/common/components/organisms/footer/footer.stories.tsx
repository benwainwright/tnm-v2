import { Story, Meta } from "@storybook/react"

import Footer from "./footer"

export default {
  title: "organisms/Footer",
  component: Footer,
} as Meta

const Template: Story = (args) => <Footer {...args} />

export const TheFooter = Template.bind({})
