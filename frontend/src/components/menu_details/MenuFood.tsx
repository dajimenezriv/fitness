// logic
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'hooks/reducer';
import { FoodType, MenuFoodType, NumberDictType } from 'data_types';
import * as menuFoodsReducer from 'reducers/menuFoodsReducer';
import * as foodsService from 'services/foods';
import { mainNutrients } from 'nutrients';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';

type params = {
  menuFood: MenuFoodType;
};

export default function MenuFood({ menuFood }: params) {
  const dispatch = useAppDispatch();
  const [food, setFood] = useState<null | FoodType>(null);

  const refreshFood = async () => {
    const res = await foodsService.getById(menuFood.foodId);
    setFood(res.data as FoodType);
  };

  useEffect(() => { refreshFood(); }, []);

  if (!food) return null;

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <DeleteIcon onClick={() => dispatch(menuFoodsReducer.deleteById(menuFood))} />
      </TableCell>
      <TableCell
        component="th"
        scope="row">
        {food.name}
      </TableCell>
      {mainNutrients.map((nutrient) => (
        <TableCell
          key={`${nutrient}-${menuFood.id}`}
          align="right">
          {food.nutrients[nutrient as keyof NumberDictType]}
        </TableCell>
      ))}
    </TableRow>
  );
}
