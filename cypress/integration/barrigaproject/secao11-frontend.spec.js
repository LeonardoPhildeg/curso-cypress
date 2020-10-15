import locators from '../../support/locators'
import '../../support/commandsConta'
import buildEnv from '../../support/routes'

describe('Teste de interface com mock', () => {
    const contas = locators.CONTAS
    beforeEach(() => {
        buildEnv()
        cy.login('gaiteirotecladeiro@mail.com', 'ss')
    })

    afterEach(() => {
        cy.clearLocalStorage()
    })

    it('Inserir conta', () => {
        cy.route({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas',
            response: [
                {
                    id: 3,
                    nome: 'Nova conta Mock',
                    visivel: true,
                    usuario_id: 11834
                },
            ]
        })

        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/contas',
            response: [
                {
                    id: 1,
                    nome: 'Poupança Mock',
                    visivel: true,
                    usuario_id: 11834
                },
                {
                    id: 2,
                    nome: 'Caixa Mock',
                    visivel: true,
                    usuario_id: 11834
                },
                {
                    id: 3,
                    nome: 'Nova conta Mock',
                    visivel: true,
                    usuario_id: 11834
                },
            ]
        }).as('contaSave')
        cy.inserirConta('Nova conta')


        cy.get('.toast-message')
            .should('contain', 'Conta inserida com sucesso')
    })

    it('Alterar conta', () => {
        cy.route({
            method: 'PUT',
            url: 'https://barrigarest.wcaquino.me/contas/**',
            response: {
                    id: 2,
                    nome: 'Nova conta caixa mock',
                    visivel: true,
                    usuario_id: 11834
            },

        })

        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/contas',
            response: [
                {
                    id: 1,
                    nome: 'Poupança Mock',
                    visivel: true,
                    usuario_id: 11834
                },
                {
                    id: 2,
                    nome: 'Nova conta caixa mock',
                    visivel: true,
                    usuario_id: 11834
                },
            ]
        })
        cy.xpath('//table//td[contains(., "Caixa Mock")]/..//i[@class="far fa-edit"]').click()
        cy.get(contas.NOME).clear().type('Nova conta caixa mock')
        cy.get(contas.BTN_SALVAR).click()

        cy.get('.toast-message')
            .should('contain', 'Conta atualizada com sucesso')
        cy.xpath('//tbody//td[contains(., "Nova conta caixa mock")]')
            .should('exist')
    })

    it('Não deve criar conta com mesmo nome', () => {
        cy.route({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas',
            response: {
                error: 'Deu ruim!'
            },
            status: 400
        }).as('mesmoNome')

        cy.acessarMenuConta()
        cy.inserirConta('Poupança Mock')

        cy.get('.toast-message')
            .should('contain', 'status code 400')
    })

    it('Verificar saldo', () => {
        cy.acessarHome()

        cy.xpath('//td[contains(., "Poupança Mock")]/../td[2]')
            .should('exist')
    })

    it('Inserir conta com validação de nome not null ', () => {
        cy.route({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas',
            response: [
                {
                    id: 3,
                    nome: 'Nova conta Mock',
                    visivel: true,
                    usuario_id: 11834
                },
            ],
            onRequest: req => {
                expect(req.request.body.nome).to.be.not.null
            }
        })

        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/contas',
            response: [
                {
                    id: 1,
                    nome: 'Poupança Mock',
                    visivel: true,
                    usuario_id: 11834
                },
                {
                    id: 2,
                    nome: 'Caixa Mock',
                    visivel: true,
                    usuario_id: 11834
                },
                {
                    id: 3,
                    nome: 'Nova conta Mock',
                    visivel: true,
                    usuario_id: 11834
                },
            ]
        }).as('contaSave')

        cy.inserirConta('Nova conta')

        cy.get('.toast-message')
            .should('contain', 'Conta inserida com sucesso')
    })

})