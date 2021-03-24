describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => { //should navigate to tuesday
    cy.visit("/"); 

    cy.contains("[data-testid=appointment]", "Tuesday") // check to make sure the dat test id day = tuesday
      .click()
      .should("have.class", "day-list__item--selected") // correct class should be selected
  });
});