// logic
import { useEffect, useState } from 'react';
import * as openFoodFactsService from 'services/openFoodFacts';

// gui
import { Dialog, DialogContent, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// components
import Scanner from './Scanner';

// styles
import './ScannerDialog.scss';

type ParamsType = {
  open: boolean;
  setOpen: any;
};

export default function ScannerDialog({ open, setOpen }: ParamsType) {
  const [barcode, setBarcode] = useState<string>('');

  useEffect(() => {
    openFoodFactsService
      .getByBarcode(barcode)
      .then((res) => {
        if (res.data.status_verbose !== 'product found') return;
        const { nutriments, stores } = res.data.product;
        console.log(nutriments, stores);
      })
      .catch(() => null);
  }, [barcode]);

  return (
    <Dialog
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

        <div className="container">
          <Scanner
            open={open}
            setBarcode={setBarcode}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
