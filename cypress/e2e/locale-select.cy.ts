describe('locale select', { defaultCommandTimeout: 20000 }, () => {
  it('redirects based on local storage', () => {
    localStorage.setItem('preferredLocaleJSON', '"es"');
    cy.visit(encodeURI('http://localhost:3003/locale-select?target=/'));
    cy.url().should('eq', 'http://localhost:3003/es');
  });

  it('if a user clicks on locale, moves to that page', () => {
    cy.visit(encodeURI('http://localhost:3003/locale-select?target=/'));
    cy.get("[href='/es']").click();
    cy.url().should('eq', 'http://localhost:3003/es');
  });

  it('if a user clicks on locale and preferred locale is gibberrish, still works', () => {
    localStorage.setItem('preferredLocaleJSON', '"rubbish"');
    cy.visit(encodeURI('http://localhost:3003/locale-select?target=/'));
    cy.get("[href='/es']").click();
    cy.url().should('eq', 'http://localhost:3003/es');
  });
});

// Prevent TypeScript from reading file as legacy script.
export {};
