import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ScreenStack} from '../../types';

export type ExploreNavigation = NativeStackNavigationProp<
  ScreenStack,
  'explore'
>;
export type ExploreProps = NativeStackScreenProps<ScreenStack, 'explore'>;
