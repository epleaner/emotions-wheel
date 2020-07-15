describe('index page', () => {
  beforeEach(() => {
    cy.exec('DB_NAME=test yarn db:reset');

    cy.log('visiting localhost:3000');
    cy.visit('/');
  });
  it('shows the header and footer', () => {
    cy.get('header').contains('button', 'feeels');

    cy.get('header')
      .get('button[data-testid="color-toggle"]')
      .should('have.attr', 'aria-label', 'Color Mode');

    cy.get('footer').contains('p', 'made with 💛 by eli');

    cy.get('footer').contains('button', 'about').click();
    cy.location('pathname').should('equal', '/about');

    cy.get('header').contains('button', 'feeels').click();
    cy.location('pathname').should('equal', '/');
  });
  it('shows the emotion selector', () => {
    cy.get('input[data-testid="emotion-selection-input"]').as('emotion-input');

    cy.get('@emotion-input').should(
      'have.attr',
      'placeholder',
      'Want to talk about it?'
    );

    cy.get('@emotion-input').type('i love having a passing test!');

    cy.get('button[data-testid="emotion-selection-submit"]').as(
      'emotion-submit'
    );

    cy.get('@emotion-submit').should('have.attr', 'disabled', 'disabled');

    cy.get('svg').contains('path', 'Love');
  });

  describe('when not logged in', () => {
    it('shows the login/signup buttons', () => {
      cy.get('header').contains('button', 'log in').click();
      cy.location('pathname').should('equal', '/login');

      cy.get('header').contains('button', 'feeels').click();
      cy.location('pathname').should('equal', '/');

      cy.get('header').contains('button', 'sign up').click();
      cy.location('pathname').should('equal', '/sign-up');

      cy.get('header').contains('button', 'feeels').click();
    });

    describe('submitting an emotion', () => {
      describe('login/signup modal', () => {
        beforeEach(() => {
          cy.get('svg')
            .as('svg')
            .contains('path', 'Love')
            .click()
            .then(() => {
              cy.get('@svg')
                .contains('path', 'Sentimental')
                .click()
                .then(() =>
                  cy
                    .get('button[data-testid="emotion-selection-submit"]')
                    .click()
                );
            });
        });
        it('shows the login/signup modal after submitting an emotion', () => {
          cy.get('section[aria-modal="true"]')
            .as('modal')
            .contains("Hey, you'll just need to log in or sign up first");

          cy.get('@modal')
            .get('button[type="submit"]')
            .contains('Log in')
            .should('have.attr', 'disabled', 'disabled');
        });
        it.only('allows for signing up', () => {
          cy.get('section[aria-modal="true"]')
            .as('modal')
            .within(() => {
              cy.contains('button', 'sign up')
                .click({ force: true })
                .then(() => {
                  cy.get('button[type="submit"]')
                    .contains('Sign up')
                    .as('sign-up-button')
                    .should('have.attr', 'disabled', 'disabled');

                  cy.get('input#signup-email')
                    .as('email')
                    .type('foo')
                    .then(() => {
                      cy.get('input#signup-password')
                        .as('password')
                        .type('bar')
                        .then(() => {
                          cy.get('input#signup-name')
                            .as('name')
                            .click()
                            .then(() => {
                              cy.get('@modal').contains('Invalid email');
                              cy.get('@modal').contains(
                                'At least 8 characters, please'
                              );

                              cy.get('@email').type('foo@boo.hoo');
                              cy.get('@password').type('12345678');
                              cy.get('@modal').should(
                                'not.contain',
                                'Invalid email'
                              );
                              cy.get('@modal').should(
                                'not.contain',
                                'At least 8 characters, please'
                              );

                              cy.get('@modal').should('contain', 'Required');

                              cy.get('input#signup-name')
                                .as('name')
                                .type('jimbo')
                                .then(() => {
                                  cy.get('@modal').should(
                                    'not.contain',
                                    'Required'
                                  );

                                  cy.get('@sign-up-button')
                                    .click()
                                    .then(() => {
                                      cy.get('@modal').should(
                                        'contain',
                                        'Thanks for signing up'
                                      );
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
      });
    });
  });
});
