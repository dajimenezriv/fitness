// logic
import { FoodType } from 'data_types';

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

const fields = {
  calories: 'Calorías (kcal)',
  fats: 'Grasas (g)',
  carbs: 'Carbohidratos (g)',
  proteins: 'Proteínas (g)',
};

type ParamsType = {
  foods: FoodType[];
  mealNumber: number;
};

export default function Foods({ foods, mealNumber }: ParamsType) {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 308 }}>
      <Table
        stickyHeader
        size="small">
        <TableHead>
          <TableRow>
            <TableCell>Alimentos (cada 100g)</TableCell>
            {Object.values(fields).map((field) => (
              <TableCell
                key={field}
                align="right">
                {field}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              fields={fields}
              mealNumber={mealNumber}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
