// logic
import { AnyAction, createSlice, ThunkAction } from '@reduxjs/toolkit';
import * as foodsService from 'services/foods';
import * as testingService from 'services/testing';
import { FoodType, NewFoodType } from 'data_types';
import { RootState } from 'store';
import { toast } from 'react-toastify';

const slice = createSlice({
  name: 'foods',
  initialState: { processing: false, foods: [] as FoodType[] },
  reducers: {
    setProcessing(state, { payload }) {
      const processing = payload;
      return { ...state, processing };
    },
    setFoods(state, { payload }) {
      const foods = payload;
      return { ...state, foods };
    },
  },
});

export const { setFoods } = slice.actions;
export default slice.reducer;

export const getAll = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    const res = await foodsService.getAll();
    dispatch(setFoods(res.data));
  } catch (err: any) {
    toast.error(err.response.data);
  }
};

export const getByName = (name: string): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    const res = await foodsService.getByName(name);
    dispatch(setFoods(res.data));
  } catch (err: any) {
    toast.error(err.response.data);
  }
};

export const add =
  (food: NewFoodType): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      await foodsService.add(food);
      dispatch(getAll());
    } catch (err: any) {
      toast.error(err.response.data);
    }
  };

export const deleteById =
  (id: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      await foodsService.deleteById(id);
      dispatch(getAll());
    } catch (err: any) {
      toast.error(err.response.data);
    }
  };

export const createTestingDB = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    await testingService.createTestingDB();
    dispatch(getAll());
  } catch (err: any) {
    toast.error(err.response.data);
  }
};
