describe('Testes API Rest', () => {
    let token
    before(() => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: 'gaiteirotecladeiro@mail.com',
                senha: 'cursocypress12345'
            }
        }).then(res => {
                token = res.body.token
            }).then(() => {
                cy.request({
                    method: 'GET',
                    url: 'https://barrigarest.wcaquino.me/reset',
                    headers: {Authorization: `JWT ${token}`}
                })
            })
    })
    it('inserir conta', () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas',
            headers: {Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta via REST',
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via REST')
        })
    })
    it('alterar conta', () => {
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/contas/',
            headers: {Authorization: `JWT ${token}`},
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {
            cy.request({
                method: 'PUT',
                url: `https://barrigarest.wcaquino.me/contas/${res.body[0].id}`,
                headers: {Authorization: `JWT ${token}`},
                body: {
                    nome: 'Conta para saldo ALTERADA',
                }
            }).as('response')
        })
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta para saldo ALTERADA')
        })
    })
    it('não deve inserir conta com mesmo nome', () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas',
            headers: {Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta única do gaiteiro',
            }
        }).then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta única do gaiteiro')
        })

        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas',
            headers: {Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta única do gaiteiro',
            },
            failOnStatusCode: false
        }).as('response2')
        cy.get('@response2').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('error', 'Já existe uma conta com esse nome!')
        })
    })
    it('inserir conta movimentação', () => {
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/contas',
            headers: {Authorization: `JWT ${token}`},
            qs: {
                nome: 'Conta para movimentacoes'
            }
        }).then(res => {
            cy.request({
                method: 'POST',
                url: `https://barrigarest.wcaquino.me/transacoes`,
                headers: {Authorization: `JWT ${token}`},
                body: {
                    conta_id: res.body[0].id,
                    data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: 'Movimentacao 1, calculo saldo',
                    envolvido: 'CCC',
                    status: true,
                    tipo: 'REC',
                    usuario_id: res.body[0].usuario_id,
                    valor: '985700'
                }
            }).as('response')
        })
        cy.get('@response').its('body.valor').should('equal', '985700.00')
        cy.get('@response').its('status').should('equal', 201)
    })
    it('Verificar saldo', () => {
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/saldo',
            headers: {Authorization: `JWT ${token}`},
        }).then(res => {
            let saldoConta
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo'){
                    saldoConta = c.saldo
                }
            })
            expect(saldoConta).to.be.equal('534.00')
        })
    })
    it('Deve remover movimentação', () => {
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/transacoes/',
            headers: {Authorization: `JWT ${token}`},
        }).then(res => {
            cy.request({
                method: 'DELETE',
                url: `https://barrigarest.wcaquino.me/transacoes/${res.body[0].id}`,
                headers: {Authorization: `JWT ${token}`},
            }).its('status').should('be.equal', 204)
        })
    })

})