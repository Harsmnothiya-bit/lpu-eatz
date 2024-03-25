import * as React from 'react';
import type {MLResProps} from './types';
import {items} from '../../../data';
import {FlatList, Pressable, Text, View} from 'react-native';
import {ItemCard} from '../shop';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export const MLResScreen: React.FC<MLResProps> = React.memo(
  ({route, navigation}) => {
    const {results} = route.params;
    const resultItems = results.map(result => {
      return items.find(item => item.name === result.name);
    });

    return (
      <FlatList
        contentContainerStyle={{padding: 10}}
        data={resultItems}
        ListHeaderComponent={Header}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(item, index) => `${item?.name}-${index}`}
        renderItem={({item}) => {
          return item ? <ItemCard navigation={navigation} item={item} /> : null;
        }}
      />
    );
  },
);

const ListEmptyComponent: React.FC = React.memo(() => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'Nunito-Bold',
          color: '#181818',
        }}>
        No results found
      </Text>
    </View>
  );
});

const Header: React.FC = React.memo(() => {
  const navigation = useNavigation();
  return (
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
  );
});
