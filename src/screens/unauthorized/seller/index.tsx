import * as React from 'react';
import type {SellerProps} from './types';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {shops} from '../../../data';
import Toast from 'react-native-toast-message';
import {useAuth} from '../../../hooks';

export const SellerScreen: React.FC<SellerProps> = React.memo(() => {
  const {logIn} = useAuth();
  const [selectedShop, setSelectedShop] = React.useState<number>(1);
  const [password, setPassword] = React.useState<string | null>(null);
  const handleLogin = () => {
    if (!password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Password is required',
      });
    }
    const theshop = shops.find(shop => shop.id === selectedShop);
    if (theshop?.password === password) {
      logIn({
        email: theshop.name,
        pic: `https://picsum.photos/200/300?random=${theshop.id}`,
        mode: 'seller',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Invalid password',
      });
    }
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        justifyContent: 'space-between',
      }}>
      <View>
        <View>
          <Text
            style={{
              fontSize: 30,
              color: '#d6620f',
              fontFamily: 'Nunito-Bold',
            }}>
            Seller Login
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 12,
              color: '#181818',
            }}>
            Login as a seller
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#181818',
            }}>
            Select your shop
          </Text>
          <Picker
            selectedValue={selectedShop}
            placeholder="Select a shop"
            style={{
              height: 50,
              width: '100%',
              marginTop: 20,
              marginBottom: 20,
              color: '#181818',
              backgroundColor: '#f0f0f0',
              borderRadius: 30,
            }}
            onValueChange={(itemValue, _itemIndex) =>
              setSelectedShop(itemValue)
            }>
            {shops.map(shop => {
              return (
                <Picker.Item label={shop.name} value={shop.id} key={shop.id} />
              );
            })}
          </Picker>

          <Text
            style={{
              fontSize: 16,
              color: '#181818',
            }}>
            Password
          </Text>
          <TextInput
            style={{
              height: 50,
              width: '100%',
              marginTop: 20,
              marginBottom: 20,
              color: '#181818',
              backgroundColor: '#f0f0f0',
              paddingVertical: 10,
              paddingHorizontal: 20,
              fontSize: 16,
            }}
            onChangeText={setPassword}
            value={password!}
            placeholderTextColor={'#181818'}
            placeholder="Password"
            secureTextEntry
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleLogin}
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
          }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
});
