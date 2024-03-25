import type {ScreenStack} from '../../../types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type SuggestNavigation = NativeStackNavigationProp<
  ScreenStack,
  'suggest'
>;
export type SuggestProps = NativeStackScreenProps<ScreenStack, 'suggest'>;
