import {useSelector} from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';
import type {RootState} from '../redux';

export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;
