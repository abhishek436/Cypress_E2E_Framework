import ProductPage from "./productPage";

class HomePage {

    goTo(url) {
        cy.visit(url)
    }

    login(username,password) {
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.get('#signInBtn').click()
        return new ProductPage();
    }

}

export default HomePage;