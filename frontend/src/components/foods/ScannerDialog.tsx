// logic
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'hooks/reducer';
import * as foodsReducer from 'reducers/foodsReducer';
import * as openFoodFactsService from 'services/openFoodFacts';
import { conversion } from 'nutrients';
import { NumberDictType } from 'data_types';

// gui
import { Dialog, DialogContent, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// components
import Scanner from './Scanner';
import ProductLabel from './ProductLabel';

// styles
import './ScannerDialog.scss';

type ParamsType = {
  open: boolean;
  setOpen: any;
};

export default function ScannerDialog({ open, setOpen }: ParamsType) {
  const dispatch = useAppDispatch();
  const [barcode, setBarcode] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nutrients, setNutrients] = useState<NumberDictType>({});
  const [stores, setStores] = useState<string>('');

  useEffect(() => {
    if (barcode === '') return;

    openFoodFactsService
      .getByBarcode(barcode)
      .then((res) => {
        if (res.data.status_verbose !== 'product found') return;

        const { product } = res.data;

        const conversedNutrients: NumberDictType = {};
        Object.entries(product.nutriments).forEach(([openFoodFactsVar, value]) => {
          const nutrient = conversion[openFoodFactsVar];
          conversedNutrients[nutrient] = value as number;
        });

        setName(product.product_name);
        setNutrients(conversedNutrients);
        setStores(product.stores);
      })
      .catch(() => null);
  }, [barcode]);

  const addProduct = () => {
    dispatch(foodsReducer.add({ name, nutrients }));
  };

  return (
    <Dialog
      className="ScannerDialog"
      maxWidth="xl"
      open={open}
      onClose={() => setOpen(false)}>
      <DialogContent>
        <TextField
          data-cy="search"
          className="Search"
          type="text"
          variant="outlined"
          placeholder="Buscar Código de Barras"
          onChange={(e) => setBarcode(e.target.value)}
          value={barcode}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Scanner
          open={open}
          setBarcode={setBarcode}
        />

        <ProductLabel
          name={name}
          nutrients={nutrients}
          stores={stores}
        />

        {name !== '' && (
          <Button
            variant="contained"
            onClick={() => addProduct()}>
            Añadir producto
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
