describe('secao 8', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    it('fixture para preencher campos', () => {
        cy.fixture('data').then((usuario) => {
            cy.get('#formNome').type(usuario.nome)
            cy.get('#formSobrenome').type(usuario.sobrenome)
            cy.get(`[name=formSexo][value=${usuario.sexo}]`).click()
            cy.get(`[name=formComidaFavorita][value=${usuario.comida}]`).click()
            cy.get('#formEscolaridade').select(usuario.escolaridade)
            cy.get('#formEsportes').select(usuario.esportes)
            cy.get('#formCadastrar').click()
        })
        cy.xpath('//div[@id=\'resultado\']/span')
            .should('contain', 'Cadastrado!')
    })
})