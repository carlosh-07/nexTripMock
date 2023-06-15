describe("Route search", () => {
  it("should be able input a stop give stop info", () => {
    cy.visit("http://localhost:3000/stop");

    cy.get('input[name="stopInput"]').type("51408");
    cy.contains("button", "Get Stop Info").click();

    cy.contains("h1", "Nicollet Mall Station").should("exist");
    cy.contains("h2", "Stop # 51408").should("exist");
  });
});
