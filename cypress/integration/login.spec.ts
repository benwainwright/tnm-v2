describe("The login page", () => {
  it("Should load a page with a login form", () => {
    cy.visit("/login/")

    cy.get("form")
  })
})
