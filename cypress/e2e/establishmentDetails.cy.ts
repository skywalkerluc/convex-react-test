describe('Establishment Details Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/Establishments/basic/1/5', { fixture: 'establishments.json' }).as('getEstablishments');
    cy.visit('/');
    cy.wait('@getEstablishments');
  });

  it('should display establishment details', () => {
    cy.intercept({
      method: 'GET',
      url: '**/Establishments/478887',
      headers: {
        'x-api-version': '2'
      }
    }, { fixture: 'establishment_details.json' }).as('getEstablishmentDetails');

    cy.get('a[href="/establishment/478887"]').click();
    cy.wait('@getEstablishmentDetails', { timeout: 10000 });

    cy.get('[data-testid="details-card"]').should('be.visible');
    cy.get('[data-testid="details-title"]').should('contain', '1 Stop Halal');
    cy.get('[data-testid="details-address"]').should('be.visible');
    cy.get('[data-testid="details-rating"]').should('be.visible');
    cy.get('[data-testid="details-inspection-date"]').should('be.visible');
  });

  it('should go back to homepage', () => {
    cy.intercept({
      method: 'GET',
      url: '**/Establishments/478887',
      headers: {
        'x-api-version': '2'
      }
    }, { fixture: 'establishment_details.json' }).as('getEstablishmentDetails');

    cy.get('a[href="/establishment/478887"]').click();
    cy.wait('@getEstablishmentDetails', { timeout: 10000 });
    cy.get('[data-testid="details-back-button"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should handle invalid establishment ID', () => {
    cy.intercept({
      method: 'GET',
      url: '**/Establishments/*',
      headers: {
        'x-api-version': '2'
      }
    }, { statusCode: 404 }).as('getEstablishmentDetails');

    cy.visit('/establishment/invalid-id');
    
    cy.get('[data-testid="details-error"]').should('be.visible');
  });

  it('should display loading indicator while fetching establishment details', () => {
    cy.intercept('GET', '**/Establishments/478887', {
      delay: 2000,
      fixture: 'establishment_details.json'
    }).as('getEstablishmentDetails');
  
    cy.get('a[href="/establishment/478887"]').click();
  
    cy.get('[data-testid="loading-indicator"]').should('be.visible');
  
    cy.wait('@getEstablishmentDetails');
  
    cy.get('[data-testid="loading-indicator"]').should('not.exist');
  });
  
  it('should display error message when fetching establishment details fails', () => {
    cy.intercept('GET', '**/Establishments/478887', {
      statusCode: 500
    }).as('getEstablishmentDetails');
  
    cy.get('a[href="/establishment/478887"]').click();
    cy.wait('@getEstablishmentDetails');
  
    cy.get('[data-testid="details-error"]').should('be.visible');
  });

  it('should display the inspection date in the correct format', () => {
    cy.intercept('GET', '**/Establishments/478887', { fixture: 'establishment_details.json' }).as('getEstablishmentDetails');
    cy.get('a[href="/establishment/478887"]').click();
    cy.wait('@getEstablishmentDetails');
    cy.get('[data-testid="details-inspection-date"]').should('contain', '09/08/2023');
  });

  it('should display the establishment scores', () => {
    cy.intercept('GET', '**/Establishments/478887', { fixture: 'establishment_details.json' }).as('getEstablishmentDetails');
    cy.get('a[href="/establishment/478887"]').click();
    cy.wait('@getEstablishmentDetails');
    cy.get('[data-testid="details-scores"]').should('be.visible');
    cy.get('[data-testid="details-scores"]').should('contain', 'Hygiene');
    cy.get('[data-testid="details-scores"]').should('contain', 'Structural');
    cy.get('[data-testid="details-scores"]').should('contain', 'Confidence');
  });
});