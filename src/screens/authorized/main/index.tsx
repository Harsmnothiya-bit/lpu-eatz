import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import type {ScreenStack} from '../../types';

import {IconProps} from './types';
import {HomeScreen} from './home';
import {OrdersScreen} from './orders';
import {LikedScreen} from './liked';
import {SuggestScreen} from './suggest';

const Tab = createBottomTabNavigator<ScreenStack>();

const HomeIcon: React.FC<IconProps> = ({focused}) => {
  return (
    <Icon
      color={focused ? '#d97e3d' : '#181818'}
      name={focused ? 'compass' : 'compass-outline'}
      size={28}
    />
  );
};

const OrdersIcon: React.FC<IconProps> = ({focused}) => {
  return (
    <Icon
      color={focused ? '#d97e3d' : '#181818'}
      name={focused ? 'person' : 'person-outline'}
      size={24}
    />
  );
};

const LikedIcon: React.FC<IconProps> = ({focused}) => {
  return (
    <Icon
      color={focused ? '#d97e3d' : '#181818'}
      name={focused ? 'heart' : 'heart-outline'}
      size={24}
    />
  );
};

const FastFoodIcon: React.FC<IconProps> = ({focused}) => {
  return (
    <Icon
      color={focused ? '#d97e3d' : '#181818'}
      name={focused ? 'fast-food' : 'fast-food-outline'}
      size={24}
    />
  );
};

export const MainScreen: React.FC = React.memo(() => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 10,
        },
      }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => <HomeIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="liked"
        component={LikedScreen}
        options={{
          tabBarIcon: ({focused}) => <LikedIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="suggest"
        component={SuggestScreen}
        options={{
          tabBarIcon: ({focused}) => <FastFoodIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({focused}) => <OrdersIcon focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
});
