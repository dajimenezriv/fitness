// gui
import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper } from '@mui/material';
import { NumberDictType } from 'data_types';

type ParamsType = {
  name: string;
  nutrients: NumberDictType;
  stores: string,
};

export default function ProductLabel({ name, nutrients, stores }: ParamsType) {
  if (name === '') return null;

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>Cada 100g</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Proveedor</TableCell>
            <TableCell>{stores}</TableCell>
          </TableRow>
          {Object.entries(nutrients).map(([nutrient, value]) => (
            <TableRow key={nutrient}>
              <TableCell>{nutrient}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
