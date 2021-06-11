import { Story, Meta } from "@storybook/react";

import MfaBox, { MfaBoxProps } from "./mfa-box";

export default {
  title: "molecules/MfaBox",
  component: MfaBox,
  argTypes: { onLogin: { action: "clicked" } },
} as Meta;

const Template: Story<MfaBoxProps> = (args) => <MfaBox {...args} />;

export const MfaStory = Template.bind({});
