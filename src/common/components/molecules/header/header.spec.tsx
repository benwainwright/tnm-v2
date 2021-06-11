import Header from "./header";
import MobileHeader from "./mobile-header";
import DesktopHeader from "./desktop-header";
import { useBreakpoints } from "../../../hooks/useBreakpoints";
import { mocked } from "ts-jest/utils";
import { shallow } from "enzyme";
import { breakpoints } from "../../../breakpoints";

jest.mock("../../../hooks/useBreakpoints");

describe("The <Header> component", () => {
  it("renders the mobile header if useBreakpoint returns small", () => {
    mocked(useBreakpoints, true).mockReturnValue("small");

    const wrapper = shallow(<Header />);

    expect(wrapper.containsMatchingElement(<MobileHeader />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<DesktopHeader />)).toEqual(false);
  });

  it("renders the mobile header if useBreakpoint returns medium", () => {
    mocked(useBreakpoints, true).mockReturnValue("medium");

    const wrapper = shallow(<Header />);

    expect(wrapper.containsMatchingElement(<MobileHeader />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<DesktopHeader />)).toEqual(false);
  });

  it("renders the desktop if useBreakpoint returns large", () => {
    mocked(useBreakpoints, true).mockReturnValue("large");

    const wrapper = shallow(<Header />);

    expect(wrapper.containsMatchingElement(<DesktopHeader />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<MobileHeader />)).toEqual(false);
  });

  it("passes the app breakpoints into useBreakpoints", () => {
    shallow(<Header />);

    expect(mocked(useBreakpoints, true)).toHaveBeenCalledWith(breakpoints);
  });
});
