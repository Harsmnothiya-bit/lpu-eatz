import type {ScreenStack} from '../../../types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type HomeNavigation = NativeStackNavigationProp<ScreenStack, 'home'>;
export type HomeProps = NativeStackScreenProps<ScreenStack, 'home'>;
