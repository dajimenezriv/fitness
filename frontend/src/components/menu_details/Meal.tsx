// logic
import { MenuFoodType } from 'data_types';
import { mainNutrients, titles } from 'nutrients';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// components
import MenuFood from './MenuFood';
import NewMenuFood from './NewMenuFood';

type ParamsType = {
  tableLength: number;
  mealNumber: number;
  mealFoods: MenuFoodType[];
};

export default function Meal({ tableLength, mealNumber, mealFoods }: ParamsType) {
  return (
    <>
      <TableRow className="Meal">
        <TableCell
          colSpan={tableLength}
          align="center">
          {`Comida ${mealNumber + 1}`}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell />
        <TableCell>Alimentos (cada 100g)</TableCell>

        {mainNutrients.map((nutrient) => (
          <TableCell
            key={nutrient}
            align="right">
            {titles[nutrient]}
          </TableCell>
        ))}
      </TableRow>

      {mealFoods.map((menuFood) => (
        <MenuFood
          key={menuFood.id}
          menuFood={menuFood}
        />
      ))}

      <NewMenuFood
        tableLength={tableLength}
        mealNumber={mealNumber}
      />
    </>
  );
}
