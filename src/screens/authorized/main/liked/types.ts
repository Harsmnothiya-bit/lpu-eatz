import type {ScreenStack} from '../../../types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type LikedNavigation = NativeStackNavigationProp<ScreenStack, 'liked'>;
export type LikedProps = NativeStackScreenProps<ScreenStack, 'liked'>;
