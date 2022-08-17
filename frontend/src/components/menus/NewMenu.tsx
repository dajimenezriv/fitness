// logic
import { useState } from 'react';
import { useAppDispatch } from 'hooks/reducer';
import { MenuType } from 'data_types';
import * as menusReducer from 'reducers/menusReducer';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const initMenu = {
  id: -1,
  name: '',
  numberOfMeals: 0,
};

type params = {
  fields: {
    numberOfMeals: string;
  };
};

export default function NewMenu({ fields }: params) {
  const [menu, setMenu] = useState<MenuType>(initMenu);

  const dispatch = useAppDispatch();

  const addMenu = () => {
    dispatch(menusReducer.add(menu));
    setMenu({ ...initMenu });
  };

  return (
    <TableRow className="NewMenu" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell className="Actions">
        <AddCircleIcon data-cy="add_menu" onClick={addMenu} />
      </TableCell>
      <TableCell component="th" scope="row">
        <input
          data-cy="new_name"
          type="text"
          placeholder="Nuevo Menú"
          onChange={(e) => setMenu({ ...menu, name: e.target.value })}
          value={menu.name}
        />
      </TableCell>
      {Object.entries(fields).map(([key, value]) => {
        const val = menu[key as keyof MenuType];
        const printVal = val === 0 ? '' : val;

        return (
          <TableCell key={key} align="right">
            <input
              data-cy={`new_${key}`}
              type="number"
              placeholder={value}
              onChange={(e) => setMenu({ ...menu, [key]: e.target.value })}
              value={printVal}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
}
