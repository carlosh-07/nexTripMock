describe("Route search", () => {
  it("should be able to fill all selections and give stop info", () => {
    cy.visit("http://localhost:3000/route");

    cy.get("select#routes").select("901");
    cy.get("select#direction").select("0");
    cy.get("select#stop").select("USBA");

    cy.contains("h1", "U.S. Bank Stadium Station").should("exist");
    cy.contains("h2", "Stop # 56330").should("exist");
  });
});
