import type {ScreenStack} from '../../types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type OrderNavigation = NativeStackNavigationProp<ScreenStack, 'order'>;
export type OrderProps = NativeStackScreenProps<ScreenStack, 'order'>;
