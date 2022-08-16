// logic
import { useAppDispatch } from 'hooks/reducer';
import { MenuFoodType } from 'data_types';
import * as menuFoodsReducer from 'reducers/menuFoodsReducer';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';

type params = {
  menuFood: MenuFoodType;
  fields: {
    quantity: string;
    calories: string;
    fats: string;
    carbs: string;
    proteins: string;
  };
};

export default function MenuFood({ menuFood, fields }: params) {
  const dispatch = useAppDispatch();

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <DeleteIcon onClick={() => dispatch(menuFoodsReducer.deleteById(menuFood))} />
      </TableCell>
      <TableCell component="th" scope="row">
        {menuFood.name}
      </TableCell>
      {Object.keys(fields).map((field) => (
        <TableCell key={`${field}-${menuFood.id}`} align="right">
          {menuFood[field as keyof MenuFoodType]}
        </TableCell>
      ))}
    </TableRow>
  );
}
