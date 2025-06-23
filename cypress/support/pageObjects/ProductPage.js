import CartPage from "./CartPage"

class ProductPage {

    pageValidation() {
        cy.contains('Shop Name').should('be.visible')
    }

    getCartCount() {
        return cy.get('app-card')
    }

    selectProduct(productname) {
        cy.get('app-card').each(($el, index, $list) => {
            const cardTitle = $el.find('h4 a').text()
            if (productname.includes(cardTitle)) {
                cy.wrap($el).contains('button', 'Add').click();
            }
        })
    }

    goToCart() {
        cy.contains('a', 'Checkout').click()
        return new CartPage();
    }

}

export default ProductPage;