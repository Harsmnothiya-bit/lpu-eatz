import type {Shop} from '../../libs/types';

// export type CardProps = Omit<Shop, 'lat' | 'long'>;
// extend on press also

export type CardProps = {
  shop: Omit<Shop, 'lat' | 'long'>;
  onPress: () => void;
};
