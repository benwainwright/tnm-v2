describe("The login page", () => {
  before(() => {
    cy.exec("yarn ts-node src/scripts/seed-cognito.ts")
  })

  it("Should load a page with a login form", () => {
    cy.visit("/login/")
    cy.get("form").get("h2").contains("Login")
  })

  it("Should display an error message if the user doesn't exist", () => {
    cy.visit("/login/")
    cy.get("form").get("input[name='email']").clear().type("a@b.c")
    cy.get("form").get("input[name='password']").clear().type("asdds")
    cy.get("form").get("button").contains("Login").click()
    cy.get("form").contains("User does not exist")
  })

  it("Should display an error message if your password is incorrect", () => {
    cy.visit("/login/")
    cy.get("form")
      .get("input[name='email']")
      .clear()
      .type(Cypress.env("TEST_EMAIL"))
    cy.get("form").get("input[name='password']").clear().type("asdsdfasd")
    cy.get("form").get("button").contains("Login").click()
    cy.get("form").contains("Incorrect username or password")
  })

  it("Should ask you to change your password and redirect you to account page when done on first login", () => {
    cy.visit("/login/")
    cy.get("form")
      .get("input[name='email']")
      .clear()
      .type(Cypress.env("TEST_EMAIL"))
    cy.get("form")
      .get("input[name='password']")
      .clear()
      .type(Cypress.env("TEST_USER_INITIAL_PASSWORD"))
    cy.get("form").get("button").contains("Login").click()
    cy.get("form").get("h2").should("have.text", "Enter a new password")
    cy.get("form")
      .get("input[name='password']")
      .clear()
      .type(Cypress.env("TEST_USER_FINAL_PASSWORD"))
    cy.get("form").get("button").contains("Submit").click()
    cy.location("pathname").should("eq", "/account/")
  })

  it("Should redirect straight to account page on second login", () => {
    cy.visit("/login/")
    cy.get("form")
      .get("input[name='email']")
      .clear()
      .type(Cypress.env("TEST_EMAIL"))
    cy.get("form")
      .get("input[name='password']")
      .clear()
      .type(Cypress.env("TEST_USER_FINAL_PASSWORD"))
    cy.get("form").get("button").contains("Login").click()
    cy.location("pathname").should("eq", "/account/")
  })
})
