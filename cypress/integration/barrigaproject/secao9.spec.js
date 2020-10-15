import locators from '../../support/locators'
import '../../support/commandsConta'

describe('Seção 9 - Teste funcional da aplicação do Seu Barriga', () => {

    const contas = locators.CONTAS
    before(() => {
        cy.login('gaiteirotecladeiro@mail.com', 'cursocypress12345')
        cy.resetApp()
    })

    beforeEach(() => {
        cy.acessarHome()
    })

    it('Inserir conta', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Nova conta')

        cy.get('.toast-message')
            .should('contain', 'Conta inserida com sucesso')
    })

    it('Alterar conta', () => {
        cy.acessarMenuConta()
        cy.xpath(contas.BTN_ALTERAR).click()
        cy.get(contas.NOME).clear().type('Nova conta alterada')
        cy.get(contas.BTN_SALVAR).click()

        cy.get('.toast-message')
            .should('contain', 'Conta atualizada com sucesso')
    })

    it('Não deve criar conta com mesmo nome', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')

        cy.get('.toast-message')
            .should('contain', 'status code 400')
    })

    it('Inserir movimentação', () => {
        cy.inserirMovimentacao('aluguel', '100', 'Sr Barriga', 'Conta para movimentacoes')

        cy.get('.toast-message')
            .should('contain', 'Movimentação inserida com sucesso!')
        cy.xpath('//span[contains(., \'aluguel\')]/following-sibling::small[contains(., \'100\')]')
            .should('exist')
    })

    it('Verificar saldo', () => {
        cy.acessarHome()

        cy.xpath('//td[contains(., "Conta para saldo")]/../td[2]')
            .should('exist')
    })

    it('Deve remover movimentação', () => {
        cy.acessarExtrato()

        const btnExcluir = cy.xpath('//span[contains(., \'Movimentacao para exclusao\')]/../../..//i[@class="far fa-trash-alt"]')
        btnExcluir.click()

        cy.get('.toast-message')
            .should('contain', 'Movimentação removida com sucesso!')
        cy.xpath('//span[contains(., \'Movimentacao para exclusao\')]/../../..//i[@class="far fa-trash-alt"]')
            .should('not.exist')
    })
})