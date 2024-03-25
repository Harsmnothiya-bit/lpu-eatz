import type {ScreenStack} from '../../types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type SearchNavigation = NativeStackNavigationProp<ScreenStack, 'search'>;
export type SearchProps = NativeStackScreenProps<ScreenStack, 'search'>;
