/// <reference types="cypress" />

/* eslint object-curly-newline: off */

export {};

const baseUrl = 'http://localhost:3000/foods';
const apiUrl = 'http://localhost:3001/api';

const foods = [
  { name: 'Banana', nutrients: { calories: 92, carbs: 23, proteins: 12, fats: 0.5 } },
  { name: 'Arroz', nutrients: { calories: 350, carbs: 60, proteins: 6, fats: 0.001 } },
  { name: 'Macarrones', nutrients: { calories: 186, carbs: 68, proteins: 7, fats: 0.0002 } },
];

describe('Foods', () => {
  beforeEach(() => {
    cy.request('GET', `${apiUrl}/testing/deleteAll`);
    cy.visit(baseUrl);

    // variables
    cy.get('[data-cy="search"]').as('Search');
    cy.get('[data-cy="add_food"]').as('AddFood');
    cy.get('[data-cy="new_name"]').as('NewName');
    cy.get('[data-cy="new_calories"]').as('NewCalories');
    cy.get('[data-cy="new_fats"]').as('NewFats');
    cy.get('[data-cy="new_carbs"]').as('NewCarbs');
    cy.get('[data-cy="new_proteins"]').as('NewProteins');
  });

  describe('Test foods', () => {
    beforeEach(() => {
      foods.forEach((food) => {
        cy.request('POST', `${apiUrl}/foods`, food);
      });
      cy.visit(baseUrl);
    });

    it('Add', () => {
      cy.get('@NewName').type('Huevo');
      cy.get('@NewName').should('have.value', 'Huevo');

      cy.get('@NewCalories').type('134');
      cy.get('@NewFats').type('12');
      cy.get('@NewCarbs').type('1');
      cy.get('@NewProteins').type('23');
      cy.get('@AddFood').click();
      cy.get('[data-cy="delete_Huevo"]');

      // clear inputs
      cy.get('@NewName').should('have.value', '');
      cy.get('@NewCalories').should('have.value', '');
    });

    it('Search', () => {
      cy.get('@Search').type('arr');
      cy.get('html').should('contain', 'Arroz');
      cy.get('html').should('contain', 'Macarrones');
      cy.get('html').should('not.contain', 'Banana');
    });

    it('Delete', () => {
      cy.get('[data-cy="delete_Banana"]').click();
      cy.get('html').should('not.contain', 'Banana');
    });
  });
});
