describe('Navigation', () => {
    it('should navigate to the create page and go back', () => {
        cy.visit('http://localhost:3000/')

        cy.get('a[href*="/create"]').first().click()

        cy.url().should('include', '/create')

        cy.get('strong').contains('Create a new Reservation')

        cy.get('p').contains('Cancel').click({force: true})

        cy.get('strong').contains('Hotel Reservation')
    })

    it('should navigate to the update page and go back', () => {
        cy.visit('http://localhost:3000/')

        cy.get('button').contains('Edit').first().click({force: true})

        cy.url().should('include', '/update')

        cy.get('strong').contains('Update Reservation')

        cy.get('p').contains('Cancel').click({force: true})

        cy.get('strong').contains('Hotel Reservation')
    })

    it('should cancel a reservation', () => {
        cy.visit('http://localhost:3000/')

        cy.get('button').contains('Cancel').first().click({force: true})

        cy.get('header').contains('Cancel a reservation')

        cy.get('button').contains('Confirm').click({force: true})
    })
})
