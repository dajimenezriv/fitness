// logic
import { useState } from 'react';
import { useAppDispatch } from 'hooks/reducer';
import { MenuType } from 'data_types';
import * as menusReducer from 'reducers/menusReducer';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function NewMenu() {
  const [menu, setMenu] = useState<MenuType>({
    id: -1,
    name: '',
    numberOfMeals: 0,
  });

  const dispatch = useAppDispatch();

  return (
    <TableRow className="NewFood" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell className="Actions">
        <AddCircleIcon onClick={() => dispatch(menusReducer.add(menu))} />
      </TableCell>
      <TableCell component="th" scope="row">
        <input type="text" placeholder="Nuevo Menú" onChange={(e) => setMenu({ ...menu, name: e.target.value })} defaultValue={menu.name} />
      </TableCell>
      <TableCell align="right">
        <input
          type="number"
          onChange={(e) => setMenu({ ...menu, numberOfMeals: parseInt(e.target.value, 10) })}
          defaultValue={menu.numberOfMeals}
        />
      </TableCell>
    </TableRow>
  );
}
