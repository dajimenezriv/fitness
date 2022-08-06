// logic
import {
  AnyAction, createSlice, ThunkAction,
} from '@reduxjs/toolkit';
import * as foodsService from 'services/foods';
import { Food } from 'data_types';
import { RootState } from 'store';
import { toast } from 'react-toastify';

const slice = createSlice({
  name: 'foods',
  initialState: { foods: [] },
  reducers: {
    setFoods(state, { payload }) {
      const foods = payload;
      return { ...state, foods };
    },
  },
});

export const { setFoods } = slice.actions;
export default slice.reducer;

export const refresh = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    const res = await foodsService.getAll();
    dispatch(setFoods(res.data));
  } catch (err: any) {
    toast.error(err.response.data);
  }
};

export const add = (food: Food): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    await foodsService.add(food);
    dispatch(refresh());
  } catch (err: any) {
    toast.error(err.response.data);
  }
};

export const deleteById = (id: number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    await foodsService.deleteById(id);
    dispatch(refresh());
  } catch (err: any) {
    toast.error(err.response.data);
  }
};
