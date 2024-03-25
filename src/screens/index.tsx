import * as React from 'react';
import type {ScreenStack} from './types';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useStoreSelector} from '../hooks';
import {LandingScreen, LoginScreen, SellerScreen} from './unauthorized';
import {
  MainScreen,
  ShopScreen,
  ResultScreen,
  SearchScreen,
  OrderScreen,
  DetailsScreen,
  DashScreen,
  ExploreScreen,
  MLResScreen,
} from './authorized';

const Stack = createNativeStackNavigator<ScreenStack>();

export function App() {
  const {user} = useStoreSelector(store => store.user);
  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: '#1890ff',
          background: '#fff',
          card: 'white',
          text: 'black',
          border: 'black',
          notification: 'black',
        },
      }}>
      <Stack.Navigator
        initialRouteName={user ? 'main' : 'landing'}
        screenOptions={{
          headerShown: false,
          animation: 'ios',
        }}>
        {user && user.mode === 'user' ? (
          <Stack.Group>
            <Stack.Screen name="main" component={MainScreen} />
            <Stack.Screen name="shop" component={ShopScreen} />
            <Stack.Screen name="search" component={SearchScreen} />
            <Stack.Screen name="results" component={ResultScreen} />
            <Stack.Screen name="order" component={OrderScreen} />
            <Stack.Screen name="details" component={DetailsScreen} />
            <Stack.Screen name="mlres" component={MLResScreen} />
            <Stack.Screen
              options={{
                animation: 'fade_from_bottom',
              }}
              name="explore"
              component={ExploreScreen}
            />
          </Stack.Group>
        ) : user && user.mode === 'seller' ? (
          <Stack.Group>
            <Stack.Screen name="dashboard" component={DashScreen} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="landing" component={LandingScreen} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="seller" component={SellerScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
