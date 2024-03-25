import * as React from 'react';
import type {ResultProps} from './types';
import {FlatList, Pressable, Text, View} from 'react-native';
import {items} from '../../../data';
import {ItemCard} from '../shop';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export const ResultScreen: React.FC<ResultProps> = React.memo(
  ({route, navigation}) => {
    const {query} = route.params;
    const [results, setResults] = React.useState<typeof items>([]);
    React.useEffect(() => {
      const resitems = items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
      setResults(resitems);
    }, [query]);
    return (
      <FlatList
        data={results}
        ListHeaderComponent={<Header query={query} />}
        contentContainerStyle={{paddingBottom: 100, padding: 10}}
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 300,
            }}>
            <Text
              style={{
                fontFamily: 'Nunito-Bold',
                fontSize: 20,
              }}>
              No results found
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <ItemCard item={item} navigation={navigation} />
        )}
      />
    );
  },
);

const Header: React.FC<{query: string}> = React.memo(({query}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: 10,
      }}>
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
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'Nunito-Bold',
          color: '#242424',
        }}>
        Results for {query}
      </Text>
    </View>
  );
});
