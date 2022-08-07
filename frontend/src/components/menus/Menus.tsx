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

// components
import Menu from './Menu';
import NewMenu from './NewMenu';

// styles
import './Menus.scss';

export default function FoodsTable() {
  const dispatch = useAppDispatch();
  const { menus }: { menus: MenuType[] } = useAppSelector((state) => state.menus);

  useEffect(() => {
    dispatch(menusReducer.refresh());
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nombre</TableCell>
            <TableCell>Número de Comidas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {menus.map((menu) => (
            <Menu key={menu.id} menu={menu} />
          ))}
          <NewMenu />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
