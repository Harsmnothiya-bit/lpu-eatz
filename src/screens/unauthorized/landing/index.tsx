import * as React from 'react';
import type {LandingProps} from './types';
import {Text, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';
import animations from '../../../assets/animations/768.json';

export const LandingScreen: React.FC<LandingProps> = React.memo(
  ({navigation}) => {
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              color: '#d6620f',
              fontFamily: 'Pacifico-Regular',
            }}>
            LPU EATZZ
          </Text>
          <LottieView
            source={animations}
            autoPlay
            loop
            style={{width: 300, height: 300}}
          />
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              fontSize: 16,
              fontFamily: 'Nunito-Regular',
              color: '#181818',
            }}>
            Cherish the taste of food from cafeteria, food stalls, etc around
            the lovely campus of LPU. {'\n '}Try our latest ML model to get
            suggestion based on your taste.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('login');
          }}
          style={{
            backgroundColor: '#d6620f',
            padding: 10,
            width: '100%',
            borderRadius: 30,
            marginTop: 20,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Nunito-Bold',
              fontSize: 16,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
);
