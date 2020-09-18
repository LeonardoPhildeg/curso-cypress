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

    it('Command clickAlert', () => {
      cy.clickAlert('#alert', 'Alert Simples')
    })

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    foods.forEach((food) => {
        it(`TESTE DINÂMICO - Cadastro com comida ${food}`, () => {
            cy.get('#formNome').type('usuario.nome')
            cy.get('#formSobrenome').type('usuario.sobrenome')
            cy.get(`[name=formSexo][value=F]`).click()
            cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.xpath('//div[@id=\'resultado\']/span')
                .should('contain', 'Cadastrado!')
        })
    })

    it('Deve selecionar os itens usando each, menos o vegetariano', () => {
        cy.get('#formNome').type('usuario.nome')
        cy.get('#formSobrenome').type('usuario.sobrenome')
        cy.get(`[name=formSexo][value=F]`).click()
        cy.get('[name=formComidaFavorita]').each((element) => {
            if(element.val() !== 'vegetariano'){
                cy.wrap(element).click()
            }
        })
        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('Corrida')
        cy.get('#formCadastrar').click()
        cy.xpath('//div[@id=\'resultado\']/span')
            .should('contain', 'Cadastrado!')
    })

    it('Comando CLOCK', () => {
        cy.clock(new Date(2020, 0, 13))
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '13/01/2020')
    })



})