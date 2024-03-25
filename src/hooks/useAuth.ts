import {addUser, logOut} from '../redux/slices/user/slice';
import {useStoreSelector} from './useStoreSelector';
import {useStoreDispatch} from './useStoreDispatch';

export function useAuth() {
  const dispatch = useStoreDispatch();
  const {user} = useStoreSelector(store => store.user);
  const logIn = ({
    email,
    pic,
    mode,
  }: {
    email: string;
    pic: string;
    mode: 'user' | 'seller';
  }) =>
    dispatch(
      addUser({
        user: {
          email,
          picture: pic,
          mode: mode,
        },
      }),
    );
  const logOutUser = () => dispatch(logOut());
  return {user, logIn, logOutUser};
}
