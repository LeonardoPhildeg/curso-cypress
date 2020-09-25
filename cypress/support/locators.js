const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: 'button[type="submit"]'
    },
    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        EXTRATO: '[data-test=menu-extrato]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
    },
    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        BTN_ALTERAR: '//table//td[contains(., "Nova conta")]/..//i[@class="far fa-edit"]'
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        CONTA: '[data-test=conta]',
        STATUS: '[data-test=status]',
        BTN_SALVAR: '.btn-primary'
    }
}

export default locators