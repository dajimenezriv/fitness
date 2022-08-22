// logic
import { useEffect, useState } from 'react';
import * as foodsReducer from 'reducers/foodsReducer';
import * as testingService from 'services/testing';
import { useAppDispatch, useAppSelector } from 'hooks/reducer';
import { FoodType } from 'data_types';

// gui
import { TextField, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// images
import barcode from 'assets/barcode.png';
import testing from 'assets/testing.png';
import login from 'assets/login.png';

// components
import FloatingButton from 'components/general/FloatingButton';
import Food from './Food';
import NewFood from './NewFood';
import ScannerDialog from './ScannerDialog';

// styles
import 'components/general/Table.scss';

/*

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#bdbdbd',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#bdbdbd',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#bdbdbd',
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#bdbdbd',
    },
  },
});

*/

const titles = {
  calories: 'Calorías (kcal)',
  fats: 'Grasas (g)',
  carbs: 'Carbohidratos (g)',
  proteins: 'Proteínas (g)',
};

const compare = (a: FoodType, b: FoodType) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

type StateType = {
  processing: boolean;
  foods: FoodType[];
};

export default function Foods() {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');
  const [openScanner, setOpenScanner] = useState(false);

  const { processing, foods }: StateType = useAppSelector((state) => state.foods);

  const actions = [
    { label: 'Escanear Código de Barras', image: barcode, onClick: () => setOpenScanner(true) },
    { label: 'Crear Database de Testing', image: testing, onClick: () => dispatch(foodsReducer.createTestingDB()) },
    { label: 'Login', image: login, onClick: () => testingService.login() },
  ];

  useEffect(() => {
    dispatch(foodsReducer.getByName(search));
  }, [search]);

  return (
    <>
      <ScannerDialog open={openScanner} setOpen={setOpenScanner} />

      <TextField
        data-cy="search"
        className="Search"
        type="text"
        variant="outlined"
        placeholder="Buscar Alimento"
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer
        component={Paper}
        sx={{ maxHeight: '594px' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Alimentos (cada 100g)</TableCell>
              {Object.values(titles).map((value) => (
                <TableCell
                  key={value}
                  align="right">
                  {value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <NewFood />
            {[...foods].sort(compare).map((food) => (
              <Food
                key={food.id}
                food={food}
                titles={titles}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FloatingButton
        actions={actions}
        processing={processing}
      />
    </>
  );
}
