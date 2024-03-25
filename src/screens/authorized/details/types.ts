import type {ScreenStack} from '../../types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type DetailsNavigation = NativeStackNavigationProp<
  ScreenStack,
  'details'
>;
export type DetailsProps = NativeStackScreenProps<ScreenStack, 'details'>;
