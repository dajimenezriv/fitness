// logic
import { FoodType } from 'data_types';
import { mainNutrients } from 'nutrients';

// gui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// components
import Food from './Food';

type ParamsType = {
  foods: FoodType[];
  mealNumber: number;
};

export default function Foods({ foods, mealNumber }: ParamsType) {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 308 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Alimentos (cada 100g)</TableCell>

            {mainNutrients.map((nutrient) => (
              <TableCell
                key={nutrient}
                align="right">
                {nutrient}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              mealNumber={mealNumber}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
