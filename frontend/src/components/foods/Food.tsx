// logic
import { useAppDispatch } from 'hooks/reducer';
import { FoodType } from 'data_types';
import * as foodsReducer from 'reducers/foodsReducer';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Food({ food }: { food: FoodType }) {
  const dispatch = useAppDispatch();

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <DeleteIcon onClick={() => dispatch(foodsReducer.deleteById(food.id))} />
      </TableCell>
      <TableCell component="th" scope="row">
        {food.name}
      </TableCell>
      <TableCell align="right">2</TableCell>
      <TableCell align="right">{food.fats}</TableCell>
      <TableCell align="right">{food.carbs}</TableCell>
      <TableCell align="right">{food.proteins}</TableCell>
    </TableRow>
  );
}
