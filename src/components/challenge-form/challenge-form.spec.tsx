import { shallow } from "enzyme";
import ChallengeForm from "./challenge-form";

describe("the challenge form", () => {
  it("renders its children", () => {
    const wrapper = shallow(<ChallengeForm>Hello!</ChallengeForm>);

    expect(wrapper.text()).toInclude("Hello!");
  });

  it("renders the header", () => {
    const wrapper = shallow(
      <ChallengeForm header="my-header">Hello!</ChallengeForm>
    );

    expect(wrapper.find("h2")).toHaveLength(1);
    expect(wrapper.text()).toInclude("my-header");
  });
});
