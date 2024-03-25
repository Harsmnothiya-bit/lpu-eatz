import {useStoreSelector} from './useStoreSelector';
import {useStoreDispatch} from './useStoreDispatch';
import {addLiked, removeLiked} from '../redux/slices/likes/slice';
import type {Item} from '../data';

export const useLiked = () => {
  const dispatch = useStoreDispatch();
  const {liked} = useStoreSelector(store => store.liked);
  const add = (item: Item) => {
    dispatch(addLiked({item}));
  };
  const remove = (item: Item) => {
    dispatch(removeLiked({item}));
  };
  return {
    liked,
    add,
    remove,
  };
};
