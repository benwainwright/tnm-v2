describe("The login page", () => {
  before(() => {
    cy.exec("yarn ts-node src/scripts/seed-cognito.ts")
  })

  it("Should load a page with a login form", () => {
    cy.visit("/login/")
    cy.get("form").get("h2").contains("Login")
  })

  it("Should display an error message if the user doesn't exist", () => {
    cy.get("form").get("input[name='email']").clear().type("a@b.c")
    cy.get("form").get("input[name='password']").clear().type("asdds")
    cy.get("form").get("button").contains("Login").click()
    cy.get("form").contains("User does not exist")
  })

  it("Should display an error message if your password is incorrect", () => {
    cy.get("form").get("input[name='email']").clear().type("testing@user.com")
    cy.get("form").get("input[name='password']").clear().type("asdsdfasd")
    cy.get("form").get("button").contains("Login").click()
    cy.get("form").contains("Incorrect username or password")
  })
})
