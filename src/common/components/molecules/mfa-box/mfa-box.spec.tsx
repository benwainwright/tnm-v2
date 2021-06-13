import { shallow } from "enzyme";
import { Input } from "../../atoms";

import MfaBox from "./mfa-box";

describe("The mfa box", () => {
  it("renders an input for code", () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<MfaBox onSubmit={onSubmit} />);

    expect(
      wrapper.find(Input).findWhere((input) => input.prop("name") === "code")
    ).toHaveLength(1);
  });
});
