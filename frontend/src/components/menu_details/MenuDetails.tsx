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
import React, { useEffect } from 'react';
import MenuFood from './MenuFood';

export default function MenuDetails() {
  const params = useParams();
  const dispatch = useAppDispatch();

  // change this
  const { menus }: { menus: MenuType[] } = useAppSelector((state) => state.menus);
  const menuId = params.id ? parseInt(params.id, 10) : -1;
  const menu = menus.find((m) => m.id === menuId);

  const { menuFoods }: { menuFoods: MenuFoodType[] } = useAppSelector((state) => state.menuFoods);

  useEffect(() => {
    dispatch(menusReducer.getAll());
    dispatch(menuFoodsReducer.getByMenuId(menuId));
  }, []);

  if (!menu) return null;

  const meals = [];
  for (let meal = 0; meal < menu.numberOfMeals; meal++) {
    const foods = menuFoods.filter((menuFood) => menuFood.mealNumber === meal);
    meals.push(
      <React.Fragment key={`Meal-${meal}`}>
        <TableRow>
          <TableCell colSpan={3}>{`Meal ${meal}`}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell />
          <TableCell>Alimento</TableCell>
          <TableCell>Cantidad</TableCell>
        </TableRow>
        {foods.map((menuFood) => (
          <MenuFood key={menuFood.id} menuFood={menuFood} />
        ))}
      </React.Fragment>,
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{menu.name}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{meals}</TableBody>
      </Table>
    </TableContainer>
  );
}
