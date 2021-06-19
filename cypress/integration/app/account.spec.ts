describe("The account page", () => {
  describe("when logged out", () => {
    it("should redirect you to login page", () => {
      cy.visit("/account/")
      cy.location("pathname").should("eq", "/login/")
    })
  })

  describe("when logged in", () => {
    beforeEach(() => {
      cy.loginByCognitoApi(
        Cypress.env("TEST_EMAIL"),
        Cypress.env("TEST_USER_FINAL_PASSWORD")
      )
    })

    it("should not redirect you away and should display its content", () => {
      cy.visit("/account/")
      cy.location("pathname").should("eq", "/account/")
      cy.get("h2").contains("You are logged in")
    })
  })
})
