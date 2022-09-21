// logic
import { useAppDispatch } from 'hooks/reducer';
import { MenuFoodType, NumberDictType } from 'data_types';
import * as menuFoodsReducer from 'reducers/menuFoodsReducer';
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

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <DeleteIcon onClick={() => dispatch(menuFoodsReducer.deleteById(menuFood))} />
      </TableCell>

      <TableCell
        component="th"
        scope="row">
        {menuFood.name}
      </TableCell>

      {mainNutrients.map((nutrient) => (
        <TableCell
          key={`${nutrient}-${menuFood.id}`}
          align="right">
          {menuFood.nutrients[nutrient as keyof NumberDictType]}
        </TableCell>
      ))}
    </TableRow>
  );
}
