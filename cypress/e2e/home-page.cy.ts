let windowErrorSpy: any;

Cypress.on('window:before:load', (win) => {
  windowErrorSpy = cy.spy(win.console, 'error');
});

const DELAY_MS: number = 1000;

describe('Home page behavior', () => {
  function runTestCases() {
    it('renders the home page without errors', () => {
      cy.visit(encodeURI('http://localhost:3003/es'));
      cy.url().should('eq', 'http://localhost:3003/es');
      // Major layout are rendered.
      cy.get('#__next');
      cy.get('header');
      cy.get('main');
      cy.get('footer');
      // No console errors are produced.
      cy.wait(DELAY_MS).then(() => {
        expect(windowErrorSpy).to.not.be.called;
      });
    });
  }

  context('on desktop or tablet', () => {
    beforeEach(() => {
      cy.viewport(768, 720);
    });

    runTestCases();
  });

  context('on mobile', () => {
    beforeEach(() => {
      // iPhone SE screen size.
      cy.viewport(375, 667);
    });

    runTestCases();
  });
});

// Prevent TypeScript from reading file as legacy script.
export {};
