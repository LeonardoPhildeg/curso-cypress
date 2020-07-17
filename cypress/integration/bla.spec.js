it('Verifica titulo', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')

    cy.title()
        .should('equal', 'Campo de Treinamento')
        .and('contain', 'Campo')
})
it('Deve mudar o texto ao clicar no botão', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')

    cy.get('#buttonSimple')
        .should('have.value', 'Clique Me!')
        .click()
        .should('have.value', 'Obrigado!')
})