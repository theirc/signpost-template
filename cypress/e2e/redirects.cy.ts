describe('Redirects', () => {
  // TODO Once you've connected a Zendesk CMS, provide a valid locale and
  // article ID for e2e testing.
  /*
   *it('Legacy article form slug should navigate to the localized article page', () => {
   *  cy.visit(
   *    encodeURI(
   *      'http://localhost:3003/hc/en-us/articles/4810060561175-some-slug'
   *    )
   *  );
   *  cy.url().should('eq', 'http://localhost:3003/en-us/4810060561175');
   *});
   */
  it('Default home page visit should redirect to locale select', () => {
    cy.visit(encodeURI('http://localhost:3003'));
    // '%2F' corresponds to '/'.
    cy.url().should('eq', 'http://localhost:3003/locale-select?target=%2F');
  });
});

// Prevent TypeScript from reading file as legacy script.
export {};
