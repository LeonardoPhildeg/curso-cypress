const buildEnv = () => {
    cy.server()
    cy.route({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        response: {
            id: 11834,
            nome: 'Gaiteiro Mock',
            token: 'token mock'
        }
    }).as('login')
    cy.route({
        method: 'GET',
        url: 'https://barrigarest.wcaquino.me/saldo',
        response: [
            {
                conta_id: 1,
                conta: 'Poupança Mock',
                saldo: '10000.00'
            },
            {
                conta_id: 2,
                conta: 'Caixa Mock',
                saldo: '990000.00'
            },
        ]
    }).as('saldo')

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
        ]
    })


}

export default buildEnv