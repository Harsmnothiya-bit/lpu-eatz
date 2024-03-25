import * as React from 'react';
import type {LikedProps} from './types';
import {FlatList, Text, View} from 'react-native';
import {useLiked} from '../../../../hooks';
import {ItemCard} from '../../shop';

export const LikedScreen: React.FC<LikedProps> = React.memo(({navigation}) => {
  const {liked} = useLiked();
  return (
    <FlatList
      contentContainerStyle={{paddingBottom: 100, padding: 10, flex: 1}}
      data={liked}
      ListEmptyComponent={EmptyComponent}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <ItemCard navigation={navigation} item={item} />}
    />
  );
});

const EmptyComponent: React.FC = React.memo(() => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 24, color: '#181818'}}>No liked items</Text>
    </View>
  );
});
