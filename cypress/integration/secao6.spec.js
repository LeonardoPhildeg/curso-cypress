describe('Secao6', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    it('alert', () => {
        cy.get('#alert')
            .click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Alert Simples')
        })
    })
    it('alert com mock', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
            })
    })
    it('iframe', () => {
        cy.get('#frame1').then((frame) => {
            const body = frame.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('dale marcio')
                .should('have.value', 'dale marcio')
        })
    })
})