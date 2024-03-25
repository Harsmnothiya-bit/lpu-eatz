import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {userState, addUserPayload} from './types';

const initialState: userState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<addUserPayload>) => {
      state.user = action.payload.user;
    },
    logOut: state => {
      state.user = null;
    },
  },
});

export const {addUser, logOut} = userSlice.actions;
export default userSlice.reducer;
