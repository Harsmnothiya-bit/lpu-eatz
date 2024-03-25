import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {addLikedPayload, likedState, removeLikedPayload} from './types';

const initialState: likedState = {
  liked: [],
};

const likedSlice = createSlice({
  name: 'liked',
  initialState,
  reducers: {
    addLiked(state, action: PayloadAction<addLikedPayload>) {
      const index = state.liked.indexOf(action.payload.item);
      if (index !== -1) {
        state.liked.splice(index, 1);
      }
      state.liked.unshift(action.payload.item);
    },
    removeLiked(state, action: PayloadAction<removeLikedPayload>) {
      state.liked = state.liked.filter(
        item => item.id !== action.payload.item.id,
      );
    },
  },
});

export const {addLiked, removeLiked} = likedSlice.actions;
export default likedSlice.reducer;
