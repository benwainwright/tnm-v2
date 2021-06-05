import { shallow } from "enzyme"
import { act } from "react-dom/test-utils"
import Input from "./input"

describe("The input component", () => {
  it("renders an html input component", () => {
    const wrapper = shallow(<Input />)

    expect(wrapper.find("input")).toHaveLength(1)
  })

  it("passes the value prop through to the value prop of the component", () => {
    const wrapper = shallow(<Input value="some field value" />)

    expect(wrapper.find("input").prop("value")).toEqual("some field value")
  })

  it("renders the label text in a label element", () => {
    const wrapper = shallow(<Input label="some label text" />)

    expect(wrapper.find("label").text()).toEqual("some label text")
  })

  it("if a name is specified, it is passed in as the name and id of the input and the for attribute for the label", () => {
    const wrapper = shallow(<Input name="input-name" />)
    expect(wrapper.find("input").prop("id")).toEqual("input-name")
    expect(wrapper.find("input").prop("name")).toEqual("input-name")
    expect(wrapper.find("label").prop("htmlFor")).toEqual("input-name")
  })

  it("triggers the component onChange handler if there is a change in the element", () => {
    const onChange = jest.fn()
    const wrapper = shallow(<Input name="input-name" onChange={onChange} />)

    const testEvent = { target: { value: "hello" } }

    act(() => {
      wrapper.find("input").simulate("change", testEvent)
    })

    expect(onChange).toHaveBeenCalledWith(testEvent)
  })
})
