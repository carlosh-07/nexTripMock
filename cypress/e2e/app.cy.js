describe("Navigation", () => {
  it("should navigate to the routes page", () => {
    cy.visit("http://localhost:3000/");

    cy.get('a[href*="route"]').click();
    cy.url().should("include", "/route");
  });

  it("should navigate to the stops page", () => {
    cy.visit("http://localhost:3000/");

    cy.get('a[href*="stop"]').click();
    cy.url().should("include", "/stop");
  });
});
