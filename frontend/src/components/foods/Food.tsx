// logic
import { useAppDispatch } from 'hooks/reducer';
import { FoodType, NumberDictType } from 'data_types';
import * as foodsReducer from 'reducers/foodsReducer';
import { mainNutrients } from 'nutrients';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';

type ParamsType = {
  food: FoodType;
};

export default function Food({ food }: ParamsType) {
  const dispatch = useAppDispatch();

  return (
    <TableRow>
      <TableCell>
        <DeleteIcon
          data-cy={`delete_${food.name}`}
          onClick={() => dispatch(foodsReducer.deleteById(food.id))}
        />
      </TableCell>
      <TableCell
        component="th"
        scope="row">
        {food.name}
      </TableCell>
      {mainNutrients.map((nutrient) => (
        <TableCell
          key={`${nutrient}-${food.id}`}
          align="right">
          {food.nutrients[nutrient as keyof NumberDictType]}
        </TableCell>
      ))}
    </TableRow>
  );
}
