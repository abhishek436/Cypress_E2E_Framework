import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"
import HomePage from "../pageObjects/HomePage"
const homePage = new HomePage()

Given('I am on Ecommerce Page', function() {
    homePage.goTo(Cypress.env('url')+"/loginpagePractise/")
})

When('I Login to the application', function() {
    this.productPage = homePage.login(this.data.username,this.data.password)
    this.productPage.pageValidation();
    this.productPage.getCartCount().should('have.length',4)
})

When('I added items to the cart', function() {
    this.productPage.selectProduct(this.data.product_name)
    this.cartPage = this.productPage.goToCart()
})

When('Validate the total price limit', function() {
    this.cartPage.sumOfProducts().then(function(sum){
      expect(sum).to.be.lessThan(200000);
    })
})

Then('select the country submit and verify thankyou', function() {
    const ConfirmationPage = this.cartPage.checkOutItems()
    ConfirmationPage.submitFormDetails()
    ConfirmationPage.getAlertMessage().should('contain','Success')

})



