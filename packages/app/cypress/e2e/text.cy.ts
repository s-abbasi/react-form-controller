describe('text.cy.ts', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    afterEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('#reset-btn').click();
    });

    it('should render typed value', () => {
        cy.get('#firstNameInput').type('sajad');
        cy.get('#value-box').invoke('text').should('equal', 'sajad');
    });

    it('should disable and render on disable event', () => {
        cy.get('#disable-btn').click();
        cy.get('#firstNameInput').should('be.disabled');
        cy.get('#is-disabled-box').invoke('text').should('equal', 'true');
    });

    it('should enable render on enable event', () => {
        cy.get('#disable-btn').click();
        cy.get('#enable-btn').click();
        cy.get('#firstNameInput').should('be.enabled');
        cy.get('#is-disabled-box').invoke('text').should('equal', 'false');
    });

    it('should set value of input and control.value to given value on setValue() and rerender', () => {
        cy.get('#set-value-btn').click();
        cy.get('#value-box').invoke('text').should('equal', 'sara');
        cy.get('#firstNameInput').should('have.value', 'sara');
    });

    it('should reset input on reset and rerender', () => {
        cy.get('#disable-btn').click();
        cy.get('#reset-btn').click();
        cy.get('#value-box').invoke('text').should('be.empty');
        cy.get('#firstNameInput').should('have.value', '');
        cy.get('#firstNameInput').should('be.enabled');
    });

    it('should render isTouched to true on blur event', () => {
        cy.get('#firstNameInput').focus();
        cy.get('#firstNameInput').blur();
        cy.get('#is-touched-box').invoke('text').should('equal', 'true');
    });

    it('should render isDirty to true when user types', () => {
        cy.get('#firstNameInput').type('something');
        cy.get('#is-dirty-box').invoke('text').should('equal', 'true');
    });

    it.skip('should render subscribed value');
    it.skip('should render correct inValid prop');
});

export {};
