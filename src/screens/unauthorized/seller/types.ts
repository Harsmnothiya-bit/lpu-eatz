import type {ScreenStack} from '../../types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type SellerNavigation = NativeStackNavigationProp<ScreenStack, 'seller'>;
export type SellerProps = NativeStackScreenProps<ScreenStack, 'seller'>;
