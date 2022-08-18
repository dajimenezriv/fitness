// logic
import React, { useEffect } from 'react';
import { MenuFoodType, MenuType } from 'data_types';
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
import MenuFood from './MenuFood';

// styles
import './MenuDetails.scss';
import NewMenuFood from './NewMenuFood';

const fields = {
  quantity: 'Cantidad',
  calories: 'Calorías (kcal)',
  fats: 'Grasas (g)',
  carbs: 'Carbohidratos (g)',
  proteins: 'Proteínas (g)',
};

const tableLength = Object.keys(fields).length + 2;

export default function MenuDetails() {
  const params = useParams();
  const dispatch = useAppDispatch();

  const menuId = params.id ? parseInt(params.id, 10) : -1;

  // change this
  const { menus }: { menus: MenuType[] } = useAppSelector((state) => state.menus);
  const menu = menus.find((m) => m.id === menuId);

  const { menuFoods }: { menuFoods: MenuFoodType[] } = useAppSelector((state) => state.menuFoods);

  useEffect(() => {
    dispatch(menusReducer.getAll());
    dispatch(menuFoodsReducer.getByMenuId(menuId));
  }, []);

  if (!menu) return null;

  // totals
  const totals: { [key: string]: number } = {};
  Object.keys(fields).forEach((field) => {
    const values = menuFoods.map((menuFood) => menuFood[field as keyof MenuFoodType]);
    const total = values.reduce((a, b) => (a as number) + (b as number), 0);
    totals[field] = total as number;
  });

  const meals = [];
  for (let mealNumber = 0; mealNumber < menu.numberOfMeals; mealNumber++) {
    const foods = menuFoods.filter((menuFood) => menuFood.mealNumber === mealNumber);

    meals.push(
      <React.Fragment key={`Meal-${mealNumber}`}>
        <TableRow className="Meal">
          <TableCell colSpan={tableLength} align="center">{`Comida ${mealNumber}`}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell />
          <TableCell>Alimento</TableCell>
          {Object.values(fields).map((field) => (
            <TableCell key={field} align="right">
              {field}
            </TableCell>
          ))}
        </TableRow>
        {foods.map((menuFood) => (
          <MenuFood key={menuFood.id} menuFood={menuFood} fields={fields} />
        ))}
        <NewMenuFood tableLength={tableLength} mealNumber={mealNumber} />
      </React.Fragment>,
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell colSpan={tableLength} align="center">
              {menu.name}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meals}
          <TableRow className="Total">
            <TableCell colSpan={1} />
            <TableCell>Total</TableCell>
            {Object.keys(fields).map((field) => (
              <TableCell key={`${field}-total`} align="right">
                {totals[field]}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
