import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'app/store/index';

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
