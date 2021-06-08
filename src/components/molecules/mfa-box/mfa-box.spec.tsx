import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import LoginBox from "./mfa-box";

describe("The mfa box", () => {
  it("calls preventDefault when the submit button is clicked", () => {
    const onDoMfa = jest.fn();
    const wrapper = mount(<LoginBox onDoMfa={onDoMfa} />);

    act(() => {
      wrapper
        .find("input[name='code']")
        .at(0)
        .simulate("change", { target: { value: "12312" } });
    });

    const preventDefault = jest.fn();

    wrapper.find("button").at(0).simulate("click", { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
  });

  it("fires an onlogin event when the submit button is clicked containing the form data", () => {
    const onDoMfa = jest.fn();
    const wrapper = mount(<LoginBox onDoMfa={onDoMfa} />);

    act(() => {
      wrapper
        .find("input[name='code']")
        .at(0)
        .simulate("change", { target: { value: "1231231" } });
    });

    wrapper.find("button").at(0).simulate("click");

    expect(onDoMfa).toHaveBeenCalledWith({
      code: "1231231",
    });
  });
});
