import {Item} from '../../../data';

export type likedState = {
  liked: Item[];
};

export type addLikedPayload = {
  item: Item;
};

export type removeLikedPayload = {
  item: Item;
};
