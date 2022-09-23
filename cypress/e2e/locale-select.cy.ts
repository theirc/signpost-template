export {};

describe('locale select', { defaultCommandTimeout: 20000 }, () => {
  it('redirects based on local storage', () => {
    localStorage.setItem('preferredLocaleJSON', '"en-us"');
    cy.visit(encodeURI('http://localhost:3003/locale-select?target=/'));
    cy.url().should('eq', 'http://localhost:3003/en-us');
  });

  it('if a user clicks on locale, moves to that page', () => {
    cy.visit(encodeURI('http://localhost:3003/locale-select?target=/'));
    cy.get("[href='/en-us']").click();
    cy.url().should('eq', 'http://localhost:3003/en-us');
  });

  it('if a user clicks on locale and preferred locale is gibberrish, still works', () => {
    localStorage.setItem('preferredLocaleJSON', '"rubbish"');
    cy.visit(encodeURI('http://localhost:3003/locale-select?target=/'));
    cy.get("[href='/en-us']").click();
    cy.url().should('eq', 'http://localhost:3003/en-us');
  });
});
