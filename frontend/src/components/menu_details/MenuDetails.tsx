// logic
import { useEffect } from 'react';
import { MenuFoodType, MenuType, NumberDictType } from 'data_types';
import { useAppDispatch, useAppSelector } from 'hooks/reducer';
import { useParams } from 'react-router-dom';
import * as menusReducer from 'reducers/menusReducer';
import * as menuFoodsReducer from 'reducers/menuFoodsReducer';
import { mainNutrients } from 'nutrients';

// gui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// components
import Meal from './Meal';

// styles
import 'components/general/Table.scss';
import './MenuDetails.scss';

const tableLength = mainNutrients.length + 2;

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

  if (!menu || !menuFoods) return null;

  // totals
  const totals: NumberDictType = {};
  mainNutrients.forEach((nutrient) => {
    const values = menuFoods.map((menuFood) => menuFood.nutrients[nutrient as keyof MenuFoodType]);
    const total = values.reduce((a, b) => (a as number) + (b as number), 0);
    totals[nutrient] = total as number;
  });

  return (
    <TableContainer
      className="Items"
      component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={tableLength}
              align="center">
              {menu.name}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(Array(3).keys()).map((mealNumber) => {
            const mealFoods = menuFoods.filter((menuFood) => menuFood.mealNumber === mealNumber);

            return (
              <Meal
                key={`Meal-${mealNumber}`}
                tableLength={tableLength}
                mealNumber={mealNumber}
                mealFoods={mealFoods}
              />
            );
          })}

          <TableRow className="Total">
            <TableCell colSpan={1} />
            <TableCell>Total</TableCell>

            {mainNutrients.map((nutrient) => (
              <TableCell
                key={`${nutrient}-total`}
                align="right">
                {totals[nutrient].toFixed(2)}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
