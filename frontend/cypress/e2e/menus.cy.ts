/// <reference types="cypress" />

/* eslint object-curly-newline: off */

export {};

const baseUrl = 'http://localhost:3000/menus';
const apiUrl = 'http://localhost:3001/api';

const menus = [
  { name: 'Déficit', numberOfMeals: 3 },
  { name: 'Volumen', numberOfMeals: 5 },
];

describe('Menus', () => {
  beforeEach(() => {
    cy.request('GET', `${apiUrl}/testing/deleteAll`);
    cy.visit(baseUrl);

    // variables
    cy.get('[data-cy="add_menu"]').as('AddMenu');
    cy.get('[data-cy="new_name"]').as('NewName');
    cy.get('[data-cy="new_numberOfMeals"]').as('NewNumberOfMeals');
  });

  describe('Empty', () => {
    it('Add', () => {
      cy.get('@NewName').type('Déficit');
      cy.get('@NewNumberOfMeals').type('2');
      cy.get('@AddMenu').click();
      cy.get('[data-cy="delete_Déficit"]');
    });
  });

  describe('Test menus', () => {
    beforeEach(() => {
      menus.forEach((menu) => {
        cy.request('POST', `${apiUrl}/menus`, menu);
      });
      cy.visit(baseUrl);
    });

    it('Delete', () => {
      cy.get('[data-cy="delete_Déficit"]').click();
      cy.get('html').should('not.contain', 'Déficit');
    });
  });
});
