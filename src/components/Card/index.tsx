import * as React from 'react';
import {CardProps} from './types';
import {Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

export const Card: React.FC<CardProps> = ({onPress, shop}) => {
  const {img, name, rating, textAddress} = shop;

  const convertToTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  return (
    <Pressable
      onPress={onPress}
      style={{
        marginVertical: 10,
        flexDirection: 'row',
      }}>
      <View
        style={{
          elevation: 5,
        }}>
        <FastImage
          source={{uri: img, priority: FastImage.priority.high}}
          style={{
            width: 120,
            height: 120,
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          flex: 1,
          padding: 5,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: '#424242',
            fontFamily: 'Inter-Bold',
          }}>
          {convertToTitleCase(name)}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: '#777777',
            fontFamily: 'Nunito-Regular',
            maxWidth: '50%',
          }}>
          {textAddress}
        </Text>
      </View>
      <View
        style={{
          marginVertical: 15,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 10,
          height: 25,
          borderRadius: 10,
          paddingHorizontal: 5,
          paddingVertical: 2,
          backgroundColor: '#d6620f',
        }}>
        <Text
          style={{
            fontSize: 10,
            color: '#fff',
            fontFamily: 'Inter-Bold',
          }}>
          {rating}
        </Text>
        <Icon name="star" size={12} color="#fff" />
      </View>
    </Pressable>
  );
};
