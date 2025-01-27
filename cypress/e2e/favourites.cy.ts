describe('Favourites Table', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/Establishments/basic/1/5', { fixture: 'establishments.json' }).as('getEstablishments');
      cy.visit('/');
      cy.wait('@getEstablishments');
    });
  
    it('should add an establishment to favourites', () => {
      cy.get('input[type="checkbox"]').first().check();
      cy.get('[data-testid="favourites-table"]').should('be.visible');
      cy.get('[data-testid="favourites-table"]').should('contain', '1 Stop Halal');
    });
  
    it('should remove an establishment from favourites', () => {
      cy.get('input[type="checkbox"]').first().check();
      cy.get('[data-testid="favourites-table"]').should('be.visible');
      cy.get('[data-testid="favourites-table"]').should('contain', '1 Stop Halal');
      cy.get('input[type="checkbox"]').first().uncheck();
      cy.get('[data-testid="empty-favourites"]').should('be.visible');
    });
  
    it('should add multiple establishments to favourites', () => {
      cy.get('input[type="checkbox"]').first().check();
      cy.get('input[type="checkbox"]').eq(1).check();
      cy.get('[data-testid="favourites-table"]').should('be.visible');
      cy.get('[data-testid="favourites-table"]').should('contain', '1 Stop Halal');
      cy.get('[data-testid="favourites-table"]').should('contain', 'A & S Pizza');
    });
  
    it('should remove an establishment from the favourites table', () => {
      cy.get('input[type="checkbox"]').first().check();
      cy.get('[data-testid="favourites-table"]').should('be.visible');
      cy.get('[data-testid="favourites-table"]').should('contain', '1 Stop Halal');
      cy.get('[data-testid="favourites-remove-button"]').first().click();
      cy.get('[data-testid="empty-favourites"]').should('be.visible');
    });
  
    it('should persist favourites across pages', () => {
      cy.get('input[type="checkbox"]').first().check();
      cy.get('[aria-label="Next page"]').click();
      cy.get('[data-testid="favourites-table"]').should('be.visible');
      cy.get('[data-testid="favourites-table"]').should('contain', '1 Stop Halal');
      cy.get('[aria-label="Previous page"]').click({ timeout: 10000 });
      cy.get('[data-testid="favourites-table"]').should('be.visible');
      cy.get('[data-testid="favourites-table"]').should('contain', '1 Stop Halal');
    });
  
    it('should remove all favourites', () => {
      cy.get('input[type="checkbox"]').first().check();
      cy.get('input[type="checkbox"]').eq(1).check();
      cy.get('[data-testid="favourites-table"]').should('be.visible');
      cy.get('[data-testid="remove-all-favourites-button"]').click();
      cy.get('[data-testid="empty-favourites"]').should('be.visible');
    });

    it('should persist favourites when navigating to the details page', () => {
        cy.get('input[type="checkbox"]').first().check();
        cy.get('[data-testid="favourites-table"]').should('be.visible');
        cy.get('[data-testid="favourites-table"]').should('contain', '1 Stop Halal');

        cy.intercept({
            method: 'GET',
            url: '**/Establishments/478887',
            headers: {
            'x-api-version': '2'
            }
        }, { fixture: 'establishment_details.json' }).as('getEstablishmentDetails');
    
        cy.get('a[href="/establishment/478887"]').click();
        cy.wait('@getEstablishmentDetails', { timeout: 10000 });

        cy.get('[data-testid="favourites-table"]').should('be.visible');
        cy.get('[data-testid="favourites-table"]').should('contain', '1 Stop Halal');

        cy.get('[data-testid="details-back-button"]').click();

        cy.get('[data-testid="favourites-table"]').should('be.visible');
        cy.get('[data-testid="favourites-table"]').should('contain', '1 Stop Halal');
    });

    it('should be able to remove favourites when navigating to the details page', () => {
        cy.get('input[type="checkbox"]').first().check();
        cy.get('[data-testid="favourites-table"]').should('be.visible');
        cy.get('[data-testid="favourites-table"]').should('contain', '1 Stop Halal');

        cy.intercept({
            method: 'GET',
            url: '**/Establishments/478887',
            headers: {
            'x-api-version': '2'
            }
        }, { fixture: 'establishment_details.json' }).as('getEstablishmentDetails');
    
        cy.get('a[href="/establishment/478887"]').click();
        cy.wait('@getEstablishmentDetails', { timeout: 10000 });

        cy.get('[data-testid="favourites-table"]').should('be.visible');
        cy.get('[data-testid="favourites-table"]').should('contain', '1 Stop Halal');

        cy.get('[data-testid="favourites-remove-button"]').first().click();
        cy.get('[data-testid="empty-favourites"]').should('be.visible');

        cy.get('[data-testid="details-back-button"]').click();

        cy.get('[data-testid="empty-favourites"]').should('be.visible');
    });
  });