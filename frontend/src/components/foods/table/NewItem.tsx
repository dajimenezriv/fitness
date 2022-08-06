// logic
import { useState } from 'react';
import { useAppDispatch } from 'hooks/reducer';
import { Food } from 'data_types';
import * as foodsReducer from 'reducers/foodsReducer';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function NewItem() {
  const [food, setFood] = useState<Food>({
    id: -1,
    name: '',
    market: '',
    carbs: 0,
    proteins: 0,
    fats: 0,
  });

  const dispatch = useAppDispatch();

  return (
    <TableRow className="NewItem" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell className="Actions">
        <AddCircleIcon onClick={() => dispatch(foodsReducer.add(food))} />
      </TableCell>
      <TableCell component="th" scope="row">
        <input
          type="text"
          placeholder="Nuevo Alimento"
          onChange={(e) => setFood({ ...food, name: e.target.value })}
          defaultValue={food.name}
        />
      </TableCell>
      <TableCell align="right">
        <input type="number" />
      </TableCell>
      <TableCell align="right">
        <input type="number" />
      </TableCell>
      <TableCell align="right">
        <input type="number" />
      </TableCell>
      <TableCell align="right">
        <input type="number" />
      </TableCell>
    </TableRow>
  );
}
