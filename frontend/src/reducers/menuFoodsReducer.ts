// logic
import { AnyAction, createSlice, ThunkAction } from '@reduxjs/toolkit';
import * as menuFoodsService from 'services/menuFoods';
import { FoodType, MenuFoodType } from 'data_types';
import { RootState } from 'store';
import { toast } from 'react-toastify';

const slice = createSlice({
  name: 'menuFoods',
  initialState: { processing: false, menuId: -1, menuFoods: [] as MenuFoodType[] },
  reducers: {
    setMenuId(state, { payload }) {
      const menuId = payload;
      return { ...state, menuId };
    },
    setProcessing(state, { payload }) {
      const processing = payload;
      return { ...state, processing };
    },
    setMenuFoods(state, { payload }) {
      const menuFoods = payload;
      return { ...state, menuFoods };
    },
  },
});

export const { setMenuId, setProcessing, setMenuFoods } = slice.actions;
export default slice.reducer;

export const getByMenuId =
  (menuId: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      const res = await menuFoodsService.getByMenuId(menuId);
      dispatch(setMenuId(menuId));
      dispatch(setMenuFoods(res.data));
    } catch (err: any) {
      toast.error(err.response.data);
    }
  };

export const add =
  (food: FoodType, quantity: number, mealNumber: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    try {
      const { menuId } = getState().menuFoods;
      const menuFood: MenuFoodType = {
        menuId,
        foodId: food.id,
        ...food,
        quantity,
        mealNumber,
      };
      await menuFoodsService.add(menuFood);
      dispatch(getByMenuId(menuFood.menuId));
    } catch (err: any) {
      toast.error(err.response.data);
    }
  };

export const deleteById =
  (menuFood: MenuFoodType): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      await menuFoodsService.deleteById(menuFood.id);
      dispatch(getByMenuId(menuFood.menuId));
    } catch (err: any) {
      toast.error(err.response.data);
    }
  };
