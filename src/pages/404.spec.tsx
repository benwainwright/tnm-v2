import Layout from "../components/layout";
import { shallow } from "enzyme";
import NotFoundPage from "./404";

describe("The 404 page", () => {
  it("renders everything within the main layout", () => {
    const wrapper = shallow(<NotFoundPage />);

    expect(wrapper.find(Layout)).toHaveLength(1);
  });
});
