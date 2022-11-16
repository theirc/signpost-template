describe('Redirects', () => {
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
    cy.visit(encodeURI('http://localhost:3003/hc/es/articles/7759527263773'));
    // '%2F' corresponds to '/'.
    cy.url().should('eq', 'http://localhost:3003/es/articles/7759527263773');
  });
});

// Prevent TypeScript from reading file as legacy script.
export {};
