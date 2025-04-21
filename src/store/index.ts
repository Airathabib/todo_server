import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import {
  useDispatch,
  useSelector,
  useStore,
  TypedUseSelectorHook,
} from 'react-redux';

//Стор для хранения состояния
export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

// типы
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// hooks
export const useAppSelector = useSelector as TypedUseSelectorHook<RootState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const useAppAsyncThunk = createAsyncThunk.withTypes();
