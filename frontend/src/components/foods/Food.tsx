// logic
import { useAppDispatch } from 'hooks/reducer';
import { FoodType } from 'data_types';
import * as foodsReducer from 'reducers/foodsReducer';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';

type params = {
  food: FoodType;
  fields: {
    calories: string;
    fats: string;
    carbs: string;
    proteins: string;
  };
};

export default function Food({ food, fields }: params) {
  const dispatch = useAppDispatch();

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <DeleteIcon onClick={() => dispatch(foodsReducer.deleteById(food.id))} />
      </TableCell>
      <TableCell component="th" scope="row">
        {food.name}
      </TableCell>
      {Object.keys(fields).map((field) => (
        <TableCell key={`${field}-${food.id}`} align="right">
          {food[field as keyof FoodType]}
        </TableCell>
      ))}
    </TableRow>
  );
}
