// logic
import { useEffect, useState } from 'react';
import * as menusReducer from 'reducers/menusReducer';
import * as testingService from 'services/testing';
import { useAppDispatch, useAppSelector } from 'hooks/reducer';
import { MenuType } from 'data_types';

// gui
import { TextField, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// images
import testing from 'assets/testing.png';
import login from 'assets/login.png';

// components
import FloatingButton from 'components/general/FloatingButton';
import Menu from './Menu';
import NewMenu from './NewMenu';

// styles
import 'components/general/Table.scss';

const titles = {
  numberOfMeals: 'Número de Comidas',
};

const compare = (a: MenuType, b: MenuType) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

type StateType = {
  processing: boolean;
  menus: MenuType[];
};

export default function Menus() {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');

  const { processing, menus }: StateType = useAppSelector((state) => state.menus);

  const actions = [
    { label: 'Crear Database de Testing', image: testing, onClick: () => dispatch(menusReducer.createTestingDB()) },
    { label: 'Login', image: login, onClick: () => testingService.login() },
  ];

  useEffect(() => {
    dispatch(menusReducer.getByName(search));
  }, []);

  return (
    <>
      <TextField
        data-cy="search"
        className="SearchItem"
        type="text"
        variant="outlined"
        placeholder="Buscar Menú"
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
        className="Items"
        component={Paper}
        sx={{ maxHeight: '594px' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nombre</TableCell>
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
            <NewMenu />
            {[...menus].sort(compare).map((menu) => (
              <Menu
                key={menu.id}
                menu={menu}
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
