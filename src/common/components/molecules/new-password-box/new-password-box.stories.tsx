import { Story, Meta } from "@storybook/react";

import NewPasswordBox, { NewPasswordBoxProps } from "./new-password-box";

export default {
  title: "molecules/NewPasswordBox",
  component: NewPasswordBox,
  argTypes: { onLogin: { action: "clicked" } },
} as Meta;

const Template: Story<NewPasswordBoxProps> = (args) => (
  <NewPasswordBox {...args} />
);

export const MfaStory = Template.bind({});
