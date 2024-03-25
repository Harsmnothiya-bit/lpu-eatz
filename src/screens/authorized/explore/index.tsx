import * as React from 'react';
import type {ExploreProps} from './types';
import {View, Text, FlatList, Pressable} from 'react-native';
import {Card} from '../../../components/Card';
import {shops} from '../../../data';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const ExploreScreen: React.FC<ExploreProps> = React.memo(
  ({navigation}) => {
    return (
      <FlatList
        ListHeaderComponent={
          <ListHeaderComponent navigation={navigation} length={shops.length} />
        }
        contentContainerStyle={{paddingBottom: 100, padding: 10}}
        data={shops.sort((a, b) => {
          if (a.rating > b.rating) {
            return -1;
          }
          if (a.rating < b.rating) {
            return 1;
          }
          return 0;
        })}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Card
            onPress={() => {
              navigation.navigate('shop', {
                shop: {
                  id: item.id,
                  name: item.name,
                  rating: item.rating,
                  img: item.img,
                  lat: item.lat,
                  long: item.long,
                  textAddress: item.textAddress,
                  password: item.password,
                },
              });
            }}
            shop={item}
          />
        )}
      />
    );
  },
);

type ListHeaderComponentProps = {
  length: number;
  navigation: ExploreProps['navigation'];
};
const ListHeaderComponent: React.FC<ListHeaderComponentProps> = React.memo(
  ({length, navigation}) => {
    return (
      <View style={{padding: 10}}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            padding: 10,
            borderRadius: 25,
            backgroundColor: '#f5f5f5',
            width: 50,
            marginBottom: 10,
            elevation: 10,
          }}>
          <Icon name="chevron-back" size={24} color="#d6620f" />
        </Pressable>
        <LottieView
          source={require('../../../assets/animations/12345.json')}
          autoPlay
          loop
          style={{
            width: 300,
            height: 300,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontSize: 18,
            color: '#d6620f',
            fontFamily: 'Nunito-SemiBold',
          }}>
          Explore from {length}+ cafes, restaurants, and more
        </Text>
      </View>
    );
  },
);
