describe('curso secao 1 a 5', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    it('Verifica titulo', () => {
        cy.title()
            .should('equal', 'Campo de Treinamento')
            .and('contain', 'Campo')
    })
    it('Deve mudar o texto ao clicar no botão', () => {
        cy.get('#buttonSimple') //pega pelo id
            .should('have.value', 'Clique Me!')
            .click()
            .should('have.value', 'Obrigado!')
    })
    it('deve localizar o texto', ()=> {
        cy.get('.facilAchar') //pega o span pela classe
            .should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })
    it('deve localizar o texto2', ()=> {
        cy.get('a[href="#"]') //pega o link específico
            .click()
            .get('#resultado')
            .should('have.text', 'Voltou!')

        cy.reload()
        cy.contains('Voltar')
            .click()
            .get('#resultado')
            .should('have.text', 'Voltou!')
    })
    it('deve localizar o input text', ()=> {
        cy.get('#formNome')
            .type('cypress test')
            .should('have.value', 'cypress test')

        cy.get('#elementosForm\\:sugestoes') //necessário colocar as duas barras quando o id tem ':'
            .type('cypress test text area')
            .should('have.value', 'cypress test text area')
            .clear()
            .should('have.value', '')
            .type('Erro{selectall}acerto')// digita Erro, apaga, e digita acerto
            .should('have.value', 'acerto')
    })
    it('deve localizar o radio button', ()=> {
        cy.get('#formSexoMasc')
            .should('not.be.checked')
            .click()
            .should('be.checked')

        cy.get('#formSexoFem')
            .should('not.be.checked')

        cy.get('[name="formSexo"]')
            .should('have.length', 2) //deve ter dois itens com o name formSexo
    })
    it('deve localizar o checkbox', ()=> {
        cy.get('#formComidaCarne')
            .should('not.be.checked')
            .click()
            .should('be.checked')

        cy.get('#formComidaPizza')
            .should('not.be.checked')

        cy.reload()

        cy.get('[name="formComidaFavorita"]')
            .click({multiple: true}) //aqui pega todos os check e faz o click
            .should('be.checked')
    })
    it('deve localizar o combobox', ()=> {
        // cy.get('#formEscolaridade')
        //     .select('2o grau completo')
        //     .should('have.value', '2graucomp')
        //     .select('1graucomp')// selecionando diretamente o value
        //     .should('have.value', '1graucomp')

        // Pegar os elementos do combo
        cy.get('#formEscolaridade option')
            .should('have.length', 8)

        cy.get('#formEscolaridade option')
            .then(listaOpcoes => {
                const values = []
                listaOpcoes.each(function () {
                    values.push(this.innerHTML)
                })
                expect(values).to.include.members(['Superior', 'Mestrado'])
            })

    })
    it('deve localizar o combo multiplo', ()=> {
        cy.get('#formEsportes')
            .select(['natacao', 'Corrida'])//seleciona múltiplos valores pelo combo

        // validar opções selecionadas do combo
        // Forma 1
        cy.get('#formEsportes')
            .then(elemento => {
                expect(elemento.val()).to.be.deep.equal(['natacao', 'Corrida'])
            })

        // Forma 2
        cy.get('#formEsportes')
            .invoke('val')
            .should('eql', ['natacao', 'Corrida'])

    })
    it('Uso do find', () => {
        cy.get('#buttonList')
            .click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
    })
    it('Uso do timeout', () => {
        cy.get('#buttonListDOM')
            .click()
        //cy.wait(5000) evitar usar
        cy.get('#lista li span', {timeout: 30000}) //espera até aparecer o item, não necessariamente o tempo do timeout
            .should('contain', 'Item 2')
    })
    it('Should vs Then', () => {
        cy.get('#buttonListDOM')
            .click()
            // .should(
            .then((element) => {
                console.log(element)
                expect(element).to.have.length(1)
                // return: o should ignora algum return dentro desse bloco e só retorna "element". O then faz o retorno
            })
        // o then ele aguarda ser finalizado para imprimir. Já o should vai imprimindo durante a execução da busca
        // até satisfazer a condição
    })
    it('Its', () => {
        const objeto = {nome: 'Leonardo', idade: 28}
        cy.wrap(objeto)
            .should('have.property', 'nome', 'Leonardo')
        cy.wrap(objeto)
            .its('nome')
            .should('be.equal', 'Leonardo')

        const objeto2 = {nome: 'Leonardo', idade: 28, endereco: {rua: 'avenida 29'}}
        cy.wrap(objeto2)
            .its('endereco')
            .should('have.property', 'rua')
        cy.wrap(objeto2)
            .its('endereco.rua')
            .should('contain', 'avenida')
    })
    it('Invoke', () => {
        const getValue = () => 1
        const soma = (num1, num2) => num1 + num2
        cy.wrap({fn: getValue})
            .invoke('fn')
            .should('be.equal', 1)
        cy.wrap({fn2: soma})
            .invoke('fn2', 2, 5)
            .should('be.equal', 7)
    })
})