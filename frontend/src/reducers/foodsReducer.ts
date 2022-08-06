import {
  AnyAction, createSlice, Dispatch, ThunkAction,
} from '@reduxjs/toolkit';
import * as foodsService from 'services/foods';
import { Food } from 'data_types';
import { RootState } from 'store';

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

export const refresh = () => async (dispatch: Dispatch) => {
  try {
    const res = await foodsService.getAll();
    dispatch(setFoods(res.data));
  } catch (err: any) {
    console.log(err.response.data);
  }
};

export const addFood = (food: Food): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    await foodsService.add(food);
    dispatch(refresh());
  } catch (err: any) {
    console.log(err.response.data);
  }
};
