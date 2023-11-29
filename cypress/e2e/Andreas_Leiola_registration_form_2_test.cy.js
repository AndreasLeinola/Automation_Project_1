beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        cy.get('#username').type('AL')
        cy.get('[placeholder="John"]').type('Andreas')
        cy.get('#lastName').type('Leinola')
        cy.get('[data-testid="phoneNumberTestId"]').type('555444666')
        cy.get('#email').type('AL@test.com')
        cy.get('#password').type('password123')
        cy.get('#confirm').type('password456')
        cy.get('h2').contains('Password').click()

        // Now, fill the same values in password and confirmation password fields
        cy.get('#password').clear()
        cy.get('#password').type('password123')
        cy.get('#confirm').clear()
        cy.get('#confirm').type('password123')
        cy.get('h2').contains('Password').click()
        
        // Assert that error message is not visible and submit button is enabled
        cy.get('.error-message').should('not.exist')
        cy.get('.submit_button').should('be.enabled')

    })


    
    it('User can submit form with all fields added', ()=>{
        cy.get('#username').type('AL')
        cy.get('[placeholder="John"]').type('Andreas')
        cy.get('#lastName').type('Leinola')
        cy.get('[data-testid="phoneNumberTestId"]').type('555444666')
        cy.get('#email').type('AL@test.com')
        cy.get('#password').type('password123')
        cy.get('#confirm').type('password123')
        cy.get('input[name="fav_language"][value="JavaScript"]').check()
        cy.get('input.checkbox.vehicles[name="vehicle2"][value="Car"]').check()
        cy.get('select[name="cars"]').select('Audi');
        cy.get('select[name="animal"]').select('Cat')

        // Assert that error message is not visible and submit button is enabled
        cy.get('.error-message').should('not.exist')
        cy.get('.submit_button').should('be.enabled')

    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        cy.get('#username').type('AL')
        cy.get('[placeholder="John"]').type('Andreas')
        cy.get('#lastName').type('Leinola')
        cy.get('[data-testid="phoneNumberTestId"]').type('555444666')
        cy.get('#email').type('AL@test.com')
        cy.get('h2').contains('Password').click()

        // Assert that error message is not visible and submit button is enabled
        cy.get('.error-message').should('not.exist')
        cy.get('.submit_button').should('be.enabled')
  
    })

    it('User cannot submit data when email is absent', () => {
        cy.get('#username').type('AL')
        cy.get('[placeholder="John"]').type('Andreas')
        cy.get('#lastName').type('Leinola')
        cy.get('[data-testid="phoneNumberTestId"]').type('555444666')
        cy.get('h2').contains('Password').click()

        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

    })

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('My test for second picture', () => {
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height, to less than 178 and greater than 100
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 100)
        .and('be.greaterThan', 80) 
    })

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking the second link 
    it('Check navigation part2', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying check boxes
    it('Check that check boxes list is correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)

        // Verify labels of the check boxes
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')

        //Verify default state of check boxes
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
    })

    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(2).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })


    // Create test similar to previous one
    it('Animals dropdown is correct', () => {
        // Select second element and create screenshot for this area, and full page
        cy.get('#animal').select(1).screenshot('Animals drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)
          
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo','cow', 'mouse'])
        })
    })
})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(AL)
    cy.get('#email').type('AL@test.com')
    cy.get('[data-cy="name"]').type('Andreas')
    cy.get('#lastName').type('Leinola')
    cy.get('[data-testid="phoneNumberTestId"]').type('555444666')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('password123')
    cy.get('#confirm').type('password123')
    cy.get('h2').contains('Password').click()
}