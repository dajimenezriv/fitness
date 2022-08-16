// logic
import { useEffect } from 'react';
import * as menusReducer from 'reducers/menusReducer';
import { useAppDispatch, useAppSelector } from 'hooks/reducer';
import { MenuType } from 'data_types';

// gui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// images
import testing from 'assets/testing.png';

// components
import FloatingButton from 'components/general/FloatingButton';
import Menu from './Menu';
import NewMenu from './NewMenu';

// styles
import './Menus.scss';

const fields = {
  numberOfMeals: 'Número de Comidas',
};

type stateTypes = {
  processing: boolean;
  menus: MenuType[];
};

export default function Menus() {
  const dispatch = useAppDispatch();

  const { processing, menus }: stateTypes = useAppSelector((state) => state.menus);

  const actions = [{ label: 'Crear Database de Testing', image: testing, onClick: () => dispatch(menusReducer.resetDatabase()) }];

  useEffect(() => {
    dispatch(menusReducer.getAll());
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nombre</TableCell>
              {Object.values(fields).map((field) => (
                <TableCell key={field} align="right">
                  {field}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {menus.map((menu) => (
              <Menu key={menu.id} menu={menu} fields={fields} />
            ))}
            <NewMenu fields={fields} />
          </TableBody>
        </Table>
      </TableContainer>
      <FloatingButton actions={actions} processing={processing} />
    </>
  );
}
