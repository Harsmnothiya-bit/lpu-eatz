import type {ScreenStack} from '../../types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type LoginNavigation = NativeStackNavigationProp<ScreenStack, 'login'>;
export type LoginProps = NativeStackScreenProps<ScreenStack, 'login'>;
