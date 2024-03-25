import * as React from 'react';
import type {SearchProps} from './types';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import {items} from '../../../data';
import Icon from 'react-native-vector-icons/Ionicons';

export const SearchScreen: React.FC<SearchProps> = React.memo(
  ({navigation}) => {
    const [search, setSearch] = React.useState<string | null>(null);
    const onHandleSearch = () => {
      navigation.navigate('results', {
        query: search!,
      });
    };
    return (
      <ScrollView
        style={{
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#f5f5f5',
            gap: 10,
          }}>
          <Icon name="search" size={24} color="#242424" />
          <TextInput
            value={search!}
            onChangeText={setSearch}
            placeholder="Search for cafes, vendors, and more"
            placeholderTextColor={'#242424'}
            onSubmitEditing={onHandleSearch}
            autoFocus
          />
        </View>
        {search && (
          <View
            style={{
              padding: 10,
              borderRadius: 10,
              gap: 10,
            }}>
            {items
              .filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase()),
              )
              .slice(0, 5)
              .map(item => (
                <Pressable
                  onPress={() =>
                    navigation.navigate('results', {
                      query: item.name,
                    })
                  }
                  key={item.id}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Text style={{color: '#181818'}}>{item.name}</Text>
                </Pressable>
              ))}
          </View>
        )}
      </ScrollView>
    );
  },
);
