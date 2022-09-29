/// <reference types="cypress" />

/* eslint object-curly-newline: off */
/* eslint no-restricted-syntax: off */
/* eslint no-await-in-loop: off */

export {};

const baseUrl = 'http://localhost:3000/menus';
const apiUrl = 'http://localhost:3001/api';

const menus = [
  { name: 'Déficit', numberOfMeals: 3 },
  { name: 'Volumen', numberOfMeals: 5 },
];

const foods = [
  { name: 'Banana', nutrients: { calories: 92, carbs: 23, proteins: 12, fats: 0.5 } },
  { name: 'Arroz', nutrients: { calories: 350, carbs: 60, proteins: 6, fats: 0.001 } },
  { name: 'Macarrones', nutrients: { calories: 186, carbs: 68, proteins: 7, fats: 0.0002 } },
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

  describe('Test menus', () => {
    beforeEach(() => {
      menus.forEach((menu) => {
        cy.request('POST', `${apiUrl}/menus`, menu);
      });

      cy.visit(baseUrl);
    });

    it('Add', () => {
      cy.get('@NewName').type('Déficit3');
      cy.get('@NewNumberOfMeals').type('2');
      cy.get('@AddMenu').click();
      cy.get('[data-cy="delete_Déficit3"]');
    });

    it('Delete', () => {
      cy.get('[data-cy="delete_Déficit"]').click();
      cy.get('html').should('not.contain', 'Déficit');
    });

    it('Enter Menu Details', () => {
      cy.contains('Déficit').click();
      cy.contains('Comida 1');
      cy.contains('Comida 2');
      cy.contains('Comida 3');
      cy.get('html').should('not.contain', 'Comida 4');
    });

    describe('Test menu foods', () => {
      beforeEach(() => {
        foods.forEach((food) => {
          cy.request('POST', `${apiUrl}/foods`, food);
        });
        cy.contains('Déficit').click();

        // variables
        cy.get('[data-cy="add_menu_food"]').as('AddMenuFood');
      });

      it.only('All', () => {
        // add banana 200g to meal 1
        cy.get('@AddMenuFood').eq(0).click();
        cy.contains(foods[0].name).click();
        cy.get('[data-cy="quantity"]').type('200');
        cy.get('[data-cy="save_menu_food"]').click();
        cy.contains(Math.trunc(foods[0].nutrients.calories * 2));

        cy.get('[data-cy="dialog_menu_food"]').type('{esc}');

        // add banana 80g to meal 2
        cy.get('@AddMenuFood').eq(1).click();
        cy.get('[data-cy="dialog_menu_food"]').contains(foods[0].name).click();
        cy.get('[data-cy="quantity"]').type('80');
        cy.get('[data-cy="save_menu_food"]').click();
        cy.contains(Math.trunc(foods[0].nutrients.calories * 0.8));

        // add arroz 120g to meal 2
        cy.get('[data-cy="dialog_menu_food"]').contains(foods[1].name).click();
        cy.get('[data-cy="quantity"]').type('120');
        cy.get('[data-cy="save_menu_food"]').click();
        cy.contains(Math.trunc(foods[1].nutrients.calories * 1.2));

        cy.get('[data-cy="dialog_menu_food"]').type('{esc}');

        cy.contains('677.60'); // total
      });
    });
  });
});
