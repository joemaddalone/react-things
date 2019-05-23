describe("app button thing", () => {
  it("an image is rendered", () => {
    cy.visit("http://localhost:9999")
      .get("[data-testid=config-button]")
      .click()
      .get("[data-testid=result-image]");
  });
});
