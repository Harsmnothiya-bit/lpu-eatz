import type {ScreenStack} from '../../types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type ResultNavigation = NativeStackNavigationProp<
  ScreenStack,
  'results'
>;
export type ResultProps = NativeStackScreenProps<ScreenStack, 'results'>;
