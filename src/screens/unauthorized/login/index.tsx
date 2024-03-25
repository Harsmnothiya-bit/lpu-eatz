import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import type {LoginProps} from './types';
import {useAuth} from '../../../hooks';
import {googleSignIn} from '../../../libs/auth/google';
import Toast from 'react-native-toast-message';

export const LoginScreen: React.FC<LoginProps> = React.memo(({navigation}) => {
  const {logIn} = useAuth();
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
      }}>
      <View>
        <Text
          style={{
            fontSize: 30,
            color: '#d6620f',
            fontFamily: 'Pacifico-Regular',
          }}>
          LPU EATZZ
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 12,
            color: '#181818',
          }}>
          You need to login to continue
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            googleSignIn()
              .then(({user}) => {
                logIn({
                  email: user.email,
                  pic: user.photo!,
                  mode: 'user',
                });
              })
              .catch(() => {
                Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: 'Something went wrong',
                });
              });
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
              textAlign: 'center',
              fontWeight: 'bold',
              fontFamily: 'Nunito-Bold',
              fontSize: 16,
            }}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('seller');
          }}
          style={{
            borderColor: '#d6620f',
            borderWidth: 1.5,
            padding: 10,
            width: '100%',
            borderRadius: 30,
            marginTop: 20,
          }}>
          <Text
            style={{
              color: '#d6620f',
              textAlign: 'center',
              fontWeight: 'bold',
              fontFamily: 'Nunito-Bold',
              fontSize: 16,
            }}>
            Login as Seller
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
