describe('Homepage', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/Establishments/basic/1/5', { fixture: 'establishments.json' }).as('getEstablishments');
    cy.visit('/');
    cy.wait('@getEstablishments');
  });

  it('should display the establishments table with correct data', () => {
    cy.get('table').should('be.visible');
    cy.get('tbody tr').should('have.length', 3);
    cy.get('tbody tr:first-child td:nth-child(2)').should('contain', '1 Stop Halal');
  });

  it('should display the authority filter and pagination controls', () => {
    cy.get('#authority-filter').should('be.visible');
    cy.get('[data-testid="pagination-controls"]').should('be.visible');
  });

  it('should display loading text while fetching data', () => {
    cy.get('[data-testid="loading-indicator"]').should('not.exist');
  });

  it('should filter establishments by authority', () => {
    cy.get('#authority-filter').select('Babergh');
    cy.get('table tbody tr').should('have.length.at.least', 1);
  });

  it('should clear the authority filter', () => {
    cy.get('#authority-filter').select('Babergh');
    cy.get('#authority-filter').select('');
    cy.url().should('not.include', '?authority=');
    cy.get('table tbody tr').should('have.length', 3);
  });

  it('should handle invalid page navigation', () => {
    cy.get('[aria-label="Previous page"]').should('be.disabled');
  });
});