import type {ScreenStack} from '../../types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type LandingNavigation = NativeStackNavigationProp<
  ScreenStack,
  'landing'
>;
export type LandingProps = NativeStackScreenProps<ScreenStack, 'landing'>;
