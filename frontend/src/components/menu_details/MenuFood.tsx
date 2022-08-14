// logic
import { useAppDispatch } from 'hooks/reducer';
import { MenuFoodType } from 'data_types';
import * as menuFoodsReducer from 'reducers/menuFoodsReducer';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MenuFood({ menuFood }: { menuFood: MenuFoodType }) {
  const dispatch = useAppDispatch();

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <DeleteIcon onClick={() => dispatch(menuFoodsReducer.deleteById(menuFood))} />
      </TableCell>
      <TableCell component="th" scope="row">
        {menuFood.foodId}
      </TableCell>
      <TableCell align="right">{menuFood.quantity}</TableCell>
    </TableRow>
  );
}
