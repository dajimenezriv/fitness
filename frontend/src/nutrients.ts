import { StringDictType } from 'data_types';

export const mainNutrients = ['calories', 'carbs', 'fats', 'proteins', 'salt'];

export const nutrients: string[][] = [
  ['calories', 'Calorías (kcal)', 'energy-kcal_100g'],
  ['carbs', 'Carbohidratos (g)', 'carbohydrates_100g'],
  ['fats', 'Grasas (g)', 'fat_100g'],
  ['saturated_fat', 'Grasas saturadas', 'saturated-fat_100g'],
  ['proteins', 'Proteínas (g)', 'proteins_100g'],
  ['salt', 'Sal (g)', 'salt_100g'],
  ['sodium', 'Sodio', 'sodium_100g'],
  ['sugars', 'Azúcar', 'sugars_100g'],
  ['fiber', 'Fibra alimentaria', 'fiber_100g'],
];

export const titles: StringDictType = {};
export const conversion: StringDictType = {};

nutrients.forEach(([nutrient, title, openFoodFactsVar]) => {
  titles[nutrient] = title;
  conversion[openFoodFactsVar] = nutrient;
});
