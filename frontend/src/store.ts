import { configureStore } from '@reduxjs/toolkit';
import foodsReducer from 'reducers/foodsReducer';
import menusReducer from 'reducers/menusReducer';

const store = configureStore({
  reducer: {
    foods: foodsReducer,
    menus: menusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// For useDispatch, the default Dispatch type does not know about thunks or other middleware.
// In order to correctly dispatch thunks, you need to use the specific customized AppDispatch
// type from the store that includes the thunk middleware types, and use that with useDispatch.
export type AppDispatch = typeof store.dispatch;
export default store;
