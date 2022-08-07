// logic
import { useAppDispatch, useAppSelector } from 'hooks/reducer';
import { useParams } from 'react-router-dom';
import * as menusReducer from 'reducers/menusReducer';
import * as menuFoodsReducer from 'reducers/menuFoodsReducer';

// gui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// components

// styles
import './MenuDetails.scss';
import { MenuFoodType, MenuType } from 'data_types';
import { useEffect } from 'react';

export default function MenuDetails() {
  const params = useParams();
  const dispatch = useAppDispatch();

  // change this
  const { menus }: { menus: MenuType[] } = useAppSelector((state) => state.menus);
  const menuId = params.id ? parseInt(params.id, 10) : -1;
  const menu = menus.find((m) => m.id === menuId);

  const { menuFoods }: { menuFoods: MenuFoodType[] } = useAppSelector((state) => state.menuFoods);

  console.log(menuFoods);

  useEffect(() => {
    dispatch(menusReducer.getAll());
    dispatch(menuFoodsReducer.getByMenuId(menuId));
  }, []);

  console.log(menu);

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
        <TableBody />
      </Table>
    </TableContainer>
  );
}
