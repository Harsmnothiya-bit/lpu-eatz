import type {ScreenStack} from '../../types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type MLResNavigation = NativeStackNavigationProp<ScreenStack, 'mlres'>;
export type MLResProps = NativeStackScreenProps<ScreenStack, 'mlres'>;
