import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { bindActionCreators } from 'redux';
import allActions from '../slices/allActions';

export const useAppDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();
  return bindActionCreators(allActions, dispatch);
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
