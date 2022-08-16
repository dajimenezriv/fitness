// logic
import {
  AnyAction, createSlice, ThunkAction,
} from '@reduxjs/toolkit';
import * as menusService from 'services/menus';
import * as testingService from 'services/testing';
import { MenuType } from 'data_types';
import { RootState } from 'store';
import { toast } from 'react-toastify';

const slice = createSlice({
  name: 'menus',
  initialState: { processing: false, menus: [] as MenuType[] },
  reducers: {
    setProcessing(state, { payload }) {
      const processing = payload;
      return { ...state, processing };
    },
    setMenus(state, { payload }) {
      const menus = payload;
      return { ...state, menus };
    },
  },
});

export const { setMenus } = slice.actions;
export default slice.reducer;

export const getAll = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    const res = await menusService.getAll();
    dispatch(setMenus(res.data));
  } catch (err: any) {
    toast.error(err.response.data);
  }
};

export const add = (menu: MenuType): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    await menusService.add(menu);
    dispatch(getAll());
  } catch (err: any) {
    toast.error(err.response.data);
  }
};

export const deleteById = (id: number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    await menusService.deleteById(id);
    dispatch(getAll());
  } catch (err: any) {
    toast.error(err.response.data);
  }
};

export const resetDatabase = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  try {
    await testingService.resetDB();
    dispatch(getAll());
  } catch (err: any) {
    toast.error(err.response.data);
  }
};
