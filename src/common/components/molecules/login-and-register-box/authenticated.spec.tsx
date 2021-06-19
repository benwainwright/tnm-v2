import { shallow } from "enzyme"
import Authenticated, { Redirect } from "./authenticated"
import renderer from "react-test-renderer"
import { currentUser } from "@common/aws/authenticate"
import { mocked } from "ts-jest/utils"

jest.mock("@common/aws/authenticate")

describe("The <Authenticated> component", () => {
  it("renders without errors", () => {
    shallow(<Authenticated redirect={Redirect.IfLoggedIn} />)
  })

  it("renders its children", () => {
    const wrapper = shallow(
      <Authenticated redirect={Redirect.IfLoggedIn}>Hello!</Authenticated>
    )
    expect(wrapper.text()).toInclude("Hello!")
  })

  it("hides its contents on first render", () => {
    const authenticated = renderer
      .create(<Authenticated redirect={Redirect.IfLoggedIn} />)
      .toJSON()
    expect(authenticated).toHaveStyleRule("display", "none")
  })

  it.skip("shows contents when a user has been found", () => {
    const user = jest.fn()
    mocked(currentUser).mockResolvedValue(user)
    // eslint-disable-next-line fp/no-let
    let authenticated: ReturnType<typeof renderer.create> | undefined
    authenticated = renderer.create(
      <Authenticated redirect={Redirect.IfLoggedIn} />
    )

    renderer.act(() => {
      authenticated?.update(<Authenticated redirect={Redirect.IfLoggedIn} />)
    })

    expect(authenticated.toJSON()).toHaveStyleRule("display", "block")
  })
})
