describe('text.cy.ts', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('should render typed value', () => {
        cy.get('input').type('sajad');
        cy.get('span').invoke('text').should('equal', 'sajad');
    });
});

export {};
