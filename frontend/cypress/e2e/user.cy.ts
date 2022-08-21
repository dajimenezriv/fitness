/// <reference types="cypress" />

/* eslint object-curly-newline: off */

//////////////// we cannot access register or login if we are logged

export {};

const baseUrl = 'http://localhost:3000';
const apiUrl = 'http://localhost:3001/api';

const users = [
  { username: 'admin', email: 'admin@mail.com', password: '1234' },
  { username: 'user', email: 'user@mail.com', password: '2345' },
];

const injectUsers = () => {
  cy.request('DELETE', `${apiUrl}/users`);
  users.forEach((user) => {
    cy.request('POST', `${apiUrl}/users/register`, user);
  });
};

describe('User', () => {
  describe('Register', () => {
    beforeEach(() => {
      cy.visit(`${baseUrl}/register`);

      // variables
      cy.get('[data-cy="register_button"]').as('RegisterButton');
      cy.get('[data-cy="username"]').as('Username');
      cy.get('[data-cy="email"]').as('Email');
      cy.get('[data-cy="password"]').as('Password');
      cy.get('[data-cy="repeat_password"]').as('RepeatPassword');
    });

    it('Correct', () => {
      cy.request('DELETE', `${apiUrl}/users`);

      cy.get('@Username').type('user');
      cy.get('@Email').type('user@mail.com');
      cy.get('@Password').type('2345');
      cy.get('@RepeatPassword').type('2345');
      cy.get('@RegisterButton').click();

      cy.url().should('eq', `${baseUrl}/profile`);
      cy.get('.Profile').contains('user');

      // visiting with urls also works
      cy.visit(`${baseUrl}/profile`);
      cy.get('.Profile').contains('user');

      // logout
      cy.contains('CERRAR SESIÓN').click();
      cy.visit(`${baseUrl}/profile`);
      cy.url().should('eq', `${baseUrl}/login`);
    });

    it('Username already exists', () => {
      injectUsers();

      cy.get('@Username').type('user');
      cy.get('@Email').type('user@mail.com');
      cy.get('@Password').type('2345');
      cy.get('@RepeatPassword').type('2345');
      cy.get('@RegisterButton').click();

      cy.get('html').contains('Username already exists.');
    });
  });

  describe('Login', () => {
    beforeEach(() => {
      cy.visit(`${baseUrl}/login`);

      // variables
      cy.get('[data-cy="login_button"]').as('LoginButton');
      cy.get('[data-cy="username"]').as('Username');
      cy.get('[data-cy="password"]').as('Password');
    });

    it('Correct', () => {
      injectUsers();

      cy.get('@Username').type('user');
      cy.get('@Password').type('2345');
      cy.get('@LoginButton').click();

      cy.url().should('eq', `${baseUrl}/profile`);
      cy.get('.Profile').contains('user');

      // logout
      cy.contains('CERRAR SESIÓN').click();
      cy.visit(`${baseUrl}/profile`);
      cy.url().should('eq', `${baseUrl}/login`);
    });
  });
});
