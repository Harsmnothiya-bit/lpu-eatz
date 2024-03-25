import {combineReducers} from '@reduxjs/toolkit';
import {userReducer} from './user';
import {likedReducer} from './likes';

const rootReducer = combineReducers({
  user: userReducer,
  liked: likedReducer,
});

export default rootReducer;
