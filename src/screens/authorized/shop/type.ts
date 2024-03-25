import type {ScreenStack} from '../../types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type ShopNavigation = NativeStackNavigationProp<ScreenStack, 'shop'>;
export type ShopProps = NativeStackScreenProps<ScreenStack, 'shop'>;
