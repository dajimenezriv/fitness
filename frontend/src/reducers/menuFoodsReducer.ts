// logic
import {
  AnyAction, createSlice, ThunkAction,
} from '@reduxjs/toolkit';
import * as menuFoodsService from 'services/menuFoods';
import { MenuFoodType } from 'data_types';
import { RootState } from 'store';
import { toast } from 'react-toastify';

const slice = createSlice({
  name: 'menuFoods',
  initialState: { menuFoods: [] as MenuFoodType[] },
  reducers: {
    setMenuFoods(state, { payload }) {
      const menuFoods = payload;
      return { ...state, menuFoods };
    },
  },
});

export const { setMenuFoods } = slice.actions;
export default slice.reducer;

export const getByMenuId = (menuId: number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    const res = await menuFoodsService.getByMenuId(menuId);
    dispatch(setMenuFoods(res.data));
  } catch (err: any) {
    console.log(err);
    toast.error(err.response.data);
  }
};

export const add = (menuFood: MenuFoodType): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    await menuFoodsService.add(menuFood.menuId, menuFood);
    dispatch(getByMenuId(menuFood.menuId));
  } catch (err: any) {
    toast.error(err.response.data);
  }
};

export const deleteById = (menuFood: MenuFoodType): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    await menuFoodsService.deleteById(menuFood.menuId, menuFood.id);
    dispatch(getByMenuId(menuFood.menuId));
  } catch (err: any) {
    toast.error(err.response.data);
  }
};
