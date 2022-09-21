// logic
import { useAppDispatch } from 'hooks/reducer';
import { MenuFoodType, NumberDictType } from 'data_types';
import * as menuFoodsReducer from 'reducers/menuFoodsReducer';
import { mainNutrients } from 'nutrients';

// gui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';

type ParamsType = {
  menuFood: MenuFoodType;
};

export default function MenuFood({ menuFood }: ParamsType) {
  const dispatch = useAppDispatch();

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <DeleteIcon onClick={() => dispatch(menuFoodsReducer.deleteById(menuFood))} />
      </TableCell>

      <TableCell
        component="th"
        scope="row">
        {`${menuFood.name} (${menuFood.quantity}g)`}
      </TableCell>

      {mainNutrients.map((nutrient) => {
        const val = menuFood.nutrients[nutrient as keyof NumberDictType];

        return (
          <TableCell
            key={`${nutrient}-${menuFood.id}`}
            align="right">
            {((val * menuFood.quantity) / 100).toFixed(2)}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
