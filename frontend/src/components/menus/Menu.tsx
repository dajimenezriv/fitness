// logic
import { useAppDispatch } from 'hooks/reducer';
import { MenuType } from 'data_types';
import * as menusReducer from 'reducers/menusReducer';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

type params = {
  menu: MenuType;
  fields: {
    numberOfMeals: string;
  };
};

export default function Menu({ menu, fields }: params) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <DeleteIcon data-cy={`delete_${menu.name}`} onClick={() => dispatch(menusReducer.deleteById(menu.id))} />
      </TableCell>
      <TableCell style={{ cursor: 'pointer' }} component="th" scope="row" onClick={() => navigate(`/menus/${menu.id}`)}>
        {menu.name}
      </TableCell>
      {Object.keys(fields).map((field) => (
        <TableCell key={`${field}-${menu.id}`} align="right">
          {menu[field as keyof MenuType]}
        </TableCell>
      ))}
    </TableRow>
  );
}
