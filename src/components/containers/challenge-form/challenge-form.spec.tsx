import { shallow } from "enzyme";
import { Button } from "../../atoms";
import { mock } from "jest-mock-extended";
import ChallengeForm from "./challenge-form";
import { act } from "react-dom/test-utils";

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

  it("renders a submit button with default text", () => {
    const wrapper = shallow(<ChallengeForm>Hello!</ChallengeForm>);

    const button = wrapper.find(Button);

    expect(button).toHaveLength(1);
    expect(button.prop("children")).toEqual("Submit");
  });

  it("renders a submit button with text from prop", () => {
    const wrapper = shallow(
      <ChallengeForm submitText="login">Hello!</ChallengeForm>
    );

    const button = wrapper.find(Button);

    expect(button).toHaveLength(1);
    expect(button.prop("children")).toEqual("login");
  });

  it("fires the submit handler when you press the button with all the data from the forms", () => {
    const mockOnSubmit = jest.fn();

    const wrapper = shallow(
      <ChallengeForm submitText="login" onSubmit={mockOnSubmit}>
        <input name="foo" />
        <input name="bar" />
      </ChallengeForm>
    );

    act(() => {
      wrapper
        .find("input[name='foo']")
        .at(0)
        .simulate("change", { target: { value: "foo-value" } });
    });

    act(() => {
      wrapper
        .find("input[name='bar']")
        .at(0)
        .simulate("change", { target: { value: "bar-value" } });
    });

    const button = wrapper.find(Button);
    button.simulate("click", { preventDefault: jest.fn() });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      foo: "foo-value",
      bar: "bar-value",
    });
  });

  it("calls preventDefault when the login button is clicked", () => {
    const mockOnSubmit = jest.fn();

    const wrapper = shallow(
      <ChallengeForm submitText="login" onSubmit={mockOnSubmit}>
        <input name="foo" />
        <input name="bar" />
      </ChallengeForm>
    );

    act(() => {
      wrapper
        .find("input[name='foo']")
        .simulate("change", { target: { value: "bar" } });
    });

    act(() => {
      wrapper
        .find("input[name='bar']")
        .simulate("change", { target: { value: "baz" } });
    });

    const preventDefault = jest.fn();

    wrapper.find(Button).simulate("click", { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
  });
});
