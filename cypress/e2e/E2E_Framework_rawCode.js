describe('E2E Framework Test', () => {

  before(function() {
    cy.fixture('example').then(function(data) {
      this.data = data
    })
  })

  it('Login Page', function () {
    const productname = this.data.product_name
    cy.visit('https://rahulshettyacademy.com/loginpagePractise/#')
    cy.get('#username').type(this.data.username)
    cy.get('#password').type(this.data.password)
    cy.get('#signInBtn').click();
    cy.contains('Shop Name').should('be.visible')
    cy.get('app-card').should('have.length',4)
    cy.get('app-card').each(($el, index, $list) => {
      const cardTitle = $el.find('h4 a').text()
      if(productname.includes(cardTitle)) {
        cy.wrap($el).contains('button','Add').click();
      }
    })
    cy.contains('a','Checkout').click()

    let sum = 0

    cy.get('tr td:nth-child(4) strong').each(($el) => {
      const amount = Number($el.text().split(" ")[1].trim())
      sum = sum + amount
    }).then(() => {
      expect(sum).to.be.lessThan(200000);
    })

    cy.contains('button','Checkout').click()
    cy.get('#country').type('India')
    // Cypress.config('defaultCommandTimeout',10000)
    cy.get('.suggestions ul li a', {timeout: 10000}).click()
    cy.get("input[type='submit']").click()
    cy.get('.alert-success').should('contain','Success')

  })

});