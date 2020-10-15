import locators from './locators'

const menu = locators.MENU
const contas = locators.CONTAS
const movimentacao = locators.MOVIMENTACAO

Cypress.Commands.add('acessarMenuConta', () => {
    cy.get(menu.SETTINGS).click()
    cy.get(menu.CONTAS).click()
})

Cypress.Commands.add('inserirConta', (conta) => {
    cy.get(contas.NOME).type(conta)
    cy.get(contas.BTN_SALVAR).click()
})

Cypress.Commands.add('inserirMovimentacao', (descricao, valor, interessado, conta) => {
    cy.get(menu.MOVIMENTACAO).click()
    cy.get(movimentacao.DESCRICAO).type(descricao)
    cy.get(movimentacao.INTERESSADO).type(interessado)
    cy.get(movimentacao.VALOR).type(valor)
    cy.get(movimentacao.CONTA).select(conta)
    cy.get(movimentacao.STATUS).click()
    cy.get(movimentacao.BTN_SALVAR).click()
})

Cypress.Commands.add('acessarHome', () => {
    cy.get(menu.HOME).click()
})

Cypress.Commands.add('acessarExtrato', () => {
    cy.get(menu.EXTRATO).click()
})

