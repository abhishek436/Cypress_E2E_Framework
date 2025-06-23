Feature: End to End ECommerce Validation

Scenario: ECommerce Products Delivery
Given I am on Ecommerce Page
When I Login to the application
And I added items to the cart
And Validate the total price limit
Then select the country submit and verify thankyou