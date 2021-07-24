import Layout from "./layout"
import { render, screen } from "@testing-library/react"
import { useContext } from "react"
import { UserContext } from "@app/user-context"
import { mocked } from "ts-jest/utils"
import { currentUser } from "@app/aws/authenticate"
import { act } from "react-dom/test-utils"
import userEvent from "@testing-library/user-event"

jest.mock("@app/aws/authenticate")

describe("the layout component", () => {
  it("renders without errors", () => {
    render(<Layout />)
  })

  it("renders its children", () => {
    render(
      <Layout>
        <p>Child Node</p>
      </Layout>
    )

    expect(screen.queryByText("Child Node")).toBeInTheDocument()
  })

  it("Provides a callback that can be used to change the current user", async () => {
    mocked(currentUser).mockResolvedValue("a-user")

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const ChildComponent = () => {
      const { user, setUser } = useContext(UserContext)
      return (
        <>
          <button
            onClick={() =>
              setUser?.({ email: "email", name: "a-new-username" })
            }
          >
            Click me
          </button>
          {user?.name}
        </>
      )
    }

    render(
      <Layout>
        <ChildComponent />
      </Layout>
    )

    act(() => {
      const button = screen.getByText("Click me")
      userEvent.click(button)
    })

    const newText = await screen.findByText("a-new-username")
    expect(newText).toBeInTheDocument()
  })

  it("sets the current authenticated user", async () => {
    mocked(currentUser).mockResolvedValue({ email: "foo", name: "foo!" })

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const ChildComponent = () => {
      const { user } = useContext(UserContext)
      return <>{user?.name}</>
    }

    render(
      <Layout>
        <ChildComponent />
      </Layout>
    )

    const userText = await screen.findByText("foo!")

    expect(userText).toBeInTheDocument()
  })
})
