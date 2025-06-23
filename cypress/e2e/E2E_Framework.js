import HomePage from "../support/pageObjects/HomePage";

describe('E2E Framework Test', () => {

  before(function() {
    cy.fixture('example').then(function(data) {
      this.data = data
      this.homepage = new HomePage();
    })
  })

  it('Login Page', function () {
    const productname = this.data.product_name
    this.homepage.goTo(Cypress.env('url')+"/loginpagePractise/")
    
    const productPage = this.homepage.login(this.data.username,this.data.password)
    cy.log(this.data.username)

    productPage.pageValidation();
    productPage.getCartCount().should('have.length',4)
    productPage.selectProduct(productname)
    
    const cartPage = productPage.goToCart()

    cartPage.sumOfProducts().then(function(sum){
      expect(sum).to.be.lessThan(200000);
    })

    const ConfirmationPage = cartPage.checkOutItems()

    ConfirmationPage.submitFormDetails()
    ConfirmationPage.getAlertMessage().should('contain','Success')

  })

});