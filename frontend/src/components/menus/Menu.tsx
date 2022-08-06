// logic
import { useAppDispatch } from 'hooks/reducer';
import { MenuType } from 'data_types';
import * as menusReducer from 'reducers/foodsReducer';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Menu({ menu }: { menu: MenuType }) {
  const dispatch = useAppDispatch();

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <DeleteIcon onClick={() => dispatch(menusReducer.deleteById(menu.id))} />
      </TableCell>
      <TableCell component="th" scope="row">
        {menu.name}
      </TableCell>
    </TableRow>
  );
}
