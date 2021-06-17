describe("The account page", () => {
  it.skip("should redirect you to the login page if you are not signed in", () => {
    cy.visit("/account/")
    cy.location("pathname").should("eq", "/account/")
  })
})
