// logic
import { useAppDispatch } from 'hooks/reducer';
import { FoodType } from 'data_types';
import * as foodsReducer from 'reducers/foodsReducer';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';

type ParamsType = {
  food: FoodType;
  titles: {
    calories: string;
    fats: string;
    carbs: string;
    proteins: string;
  };
};

export default function Food({ food, titles }: ParamsType) {
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
      {Object.keys(titles).map((key) => (
        <TableCell
          key={`${key}-${food.id}`}
          align="right">
          {food[key as keyof FoodType]}
        </TableCell>
      ))}
    </TableRow>
  );
}
