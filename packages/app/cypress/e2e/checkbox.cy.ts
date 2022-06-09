describe('checkbox.cy.ts', () => {
    beforeEach(() => {
        cy.visit('/checkbox');
    });

    it('should render selected value', () => {
        cy.get('#checkbox-inp').click();
        cy.get('#value-box').invoke('text').should('equal', 'true');
    });

    it('should disable and render on disable event', () => {
        cy.get('#disable-btn').click();
        cy.get('#checkbox-inp').should('be.disabled');
        cy.get('#is-disabled-box').invoke('text').should('equal', 'true');
    });

    it('should enable render on enable event', () => {
        cy.get('#disable-btn').click();
        cy.get('#enable-btn').click();
        cy.get('#checkbox-inp').should('be.enabled');
        cy.get('#is-disabled-box').invoke('text').should('equal', 'false');
    });

    it('should set value of input and control.value to given value on setValue() and rerender', () => {
        cy.get('#set-value-btn').click();
        cy.get('#value-box').invoke('text').should('equal', 'true');
    });

    it('should reset input on reset and rerender', () => {
        cy.get('#checkbox-inp').click();
        cy.get('#disable-btn').click();
        cy.get('#reset-btn').click();
        cy.get('#value-box').invoke('text').should('equal', 'false');
        cy.get('#checkbox-inp').should('be.enabled');
    });

    it('should render isTouched to true on blur event', () => {
        cy.get('#checkbox-inp').focus();
        cy.get('#checkbox-inp').blur();
        cy.get('#is-touched-box').invoke('text').should('equal', 'true');
    });

    it('should render isDirty to true when user changes input', () => {
        cy.get('#checkbox-inp').click();
        cy.get('#is-dirty-box').invoke('text').should('equal', 'true');
    });
});
