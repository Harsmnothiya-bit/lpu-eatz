import type {ScreenStack} from '../../types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type MainNavigation = NativeStackNavigationProp<ScreenStack, 'main'>;
export type MainProps = NativeStackScreenProps<ScreenStack, 'main'>;

export type IconProps = {
  focused: boolean;
};
