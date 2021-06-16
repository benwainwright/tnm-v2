import { Helmet } from "react-helmet"
import { shallow } from "enzyme"
import { mocked } from "ts-jest/utils"
import { useStaticQuery } from "gatsby"
import Seo from "./seo"

jest.mock("gatsby")
jest.mock("react-helmet")

describe("The SEO component", () => {
  it("renders without error", () => {
    mocked(useStaticQuery).mockReturnValue({
      title: "bar",
      site: {
        siteMetadata: "bar",
      },
    })
    shallow(<Seo title="Page" />)
  })

  it("Passes the page title to helmet", () => {
    mocked(useStaticQuery).mockReturnValue({
      title: "bar",
      site: {
        siteMetadata: "bar",
      },
    })
    const wrapper = shallow(<Seo title="Page" />)

    expect(wrapper.find(Helmet).prop("title")).toEqual("Page")
  })

  it("Passes website type to Helmet", () => {
    mocked(useStaticQuery).mockReturnValue({
      title: "bar",
      site: {
        siteMetadata: {
          description: "the description",
        },
      },
    })
    const wrapper = shallow(<Seo title="Page" />)
    expect(wrapper.find(Helmet).prop("meta")).toEqual(
      expect.arrayContaining([{ property: `og:type`, content: "website" }])
    )
  })

  it("Passes the author to helmet meta", () => {
    mocked(useStaticQuery).mockReturnValue({
      title: "bar",
      site: {
        siteMetadata: {
          author: "foo-author",
        },
      },
    })
    const wrapper = shallow(<Seo title="Page" />)
    expect(wrapper.find(Helmet).prop("meta")).toEqual(
      expect.arrayContaining([
        { name: `twitter:creator`, content: "foo-author" },
      ])
    )
  })

  it("Passes the description to helmet meta", () => {
    mocked(useStaticQuery).mockReturnValue({
      title: "bar",
      site: {
        siteMetadata: {
          description: "the description",
        },
      },
    })
    const wrapper = shallow(<Seo title="Page" />)
    expect(wrapper.find(Helmet).prop("meta")).toEqual(
      expect.arrayContaining([
        { name: `description`, content: "the description" },
        { property: `og:description`, content: "the description" },
        { name: `twitter:description`, content: "the description" },
      ])
    )
  })
})
