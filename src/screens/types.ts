import {Item, Shop} from '../data';
import {Order} from '../libs/db/schemas/order';
import {SuggestResponse} from './authorized/main/suggest';

export type ScreenStack = {
  login: undefined;
  landing: undefined;

  main: undefined;
  home: undefined;
  liked: undefined;
  suggest: undefined;
  explore: undefined;
  orders: undefined;
  shop: {
    shop: Shop;
  };
  search: undefined;
  results: {
    query: string;
  };
  order: {
    item: Item;
  };
  seller: undefined;
  dashboard: undefined;
  details: {
    item: Order;
  };
  mlres: {
    results: SuggestResponse[];
  };
};
