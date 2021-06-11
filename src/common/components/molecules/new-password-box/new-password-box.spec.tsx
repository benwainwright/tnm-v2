import { shallow } from "enzyme";
import { Input } from "../../atoms";

import NewPasswordBox from "./new-password-box";

describe("The new password box", () => {
  it("renders an input for password", () => {
    const wrapper = shallow(<NewPasswordBox />);

    expect(
      wrapper
        .find(Input)
        .findWhere((input) => input.prop("name") === "password")
    ).toHaveLength(1);
  });
});
