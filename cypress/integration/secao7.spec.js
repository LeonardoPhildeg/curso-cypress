describe('Secao7', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    it('selector', () => {
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input')
        cy.get('[onclick*=\'Francisco\']')// * significa que contem o termo "Francisco" no onclick

        cy.get('#tabelaUsuarios td:contains("Doutorado"):eq(0)')
    })
    it('using xpath para chegar no input da tabela onde tem o nome Francisco', () => {
        cy.xpath('//input[contains(@onclick, \'Francisco\')]')
        cy.xpath('//table[@id=\'tabelaUsuarios\']//td[contains(., \'Francisco\')]/following-sibling::td/input')
    })
})