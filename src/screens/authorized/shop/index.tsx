import * as React from 'react';
import type {ShopNavigation, ShopProps} from './type';
import {Image, Linking, Pressable, SectionList, Text, View} from 'react-native';
import {Item, Shop, items, shops} from '../../../data';
import Icon from 'react-native-vector-icons/Ionicons';
import {ResultNavigation} from '../result/types';
import {LikedNavigation} from '../main/liked/types';
import {MLResNavigation} from '../mlres/types';

export const ShopScreen: React.FC<ShopProps> = React.memo(
  ({route, navigation}) => {
    const {shop} = route.params;
    const shopItems = items.filter(item => item.from === String(shop.id));

    const sections = shopItems.reduce((acc, item) => {
      const existingCategory = acc.find(
        section => section.title === item.category,
      );
      if (existingCategory) {
        existingCategory.data.push(item);
      } else {
        acc.push({
          title: item.category,
          data: [item],
        });
      }
      return acc;
    }, [] as {title: string; data: Item[]}[]);

    return (
      <SectionList
        sections={sections}
        keyExtractor={(item: Item) => item.id.toString()}
        ListHeaderComponent={
          <Header
            navigation={navigation}
            sections={sections.map(section => section.title)}
            itemshere={shopItems.length}
            shop={shop}
          />
        }
        renderSectionHeader={({section}) => (
          <SectionHeader title={section.title} />
        )}
        contentContainerStyle={{paddingBottom: 100, padding: 10}}
        renderItem={({item}) => (
          <ItemCard
            shopNameVisible={false}
            navigation={navigation}
            item={item}
          />
        )}
      />
    );
  },
);

const SectionHeader: React.FC<{title: string}> = ({title}) => {
  return (
    <View
      style={{
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}>
      <Text
        style={{
          fontSize: 20,
          color: '#181818',
          fontFamily: 'Nunito-Bold',
        }}>
        {title}
      </Text>
    </View>
  );
};

const Header: React.FC<{
  shop: Shop;
  sections: string[];
  itemshere: number;
  navigation: ShopNavigation;
}> = ({shop, itemshere, sections, navigation}) => {
  const convertToTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  return (
    <View
      style={{
        marginBottom: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
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
        <Pressable
          onPress={() => {
            Linking.openURL(
              `https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.long}`,
            );
          }}
          style={{
            flexDirection: 'row',
            gap: 10,
            borderRadius: 10,
          }}>
          <Icon color={'#d6620f'} name="navigate" size={20} />
          <Text
            style={{
              color: '#d6620f',
            }}>
            Directions
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <Text
          style={{
            fontSize: 24,
            color: '#212121',
            fontFamily: 'Nunito-Bold',
          }}>
          {convertToTitleCase(shop.name)}
        </Text>
        <View
          style={{
            marginVertical: 4,
          }}>
          {sections.length === 1 ? (
            <Text
              style={{
                color: '#181818',
              }}>
              {sections[0]}
            </Text>
          ) : sections.length === 3 ? (
            <Text
              style={{
                color: '#181818',
              }}>
              {sections.join(' • ')}
            </Text>
          ) : (
            <Text
              style={{
                color: '#181818',
              }}>
              {sections.slice(0, 3).join(' • ')} • etc
            </Text>
          )}
        </View>
        <Text
          style={{
            color: '#181818',
            fontSize: 12,
            marginVertical: 4,
          }}>
          {itemshere} items available
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          padding: 10,
        }}>
        <View
          style={{
            backgroundColor: '#edebeb',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: 340,
            alignSelf: 'center',
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          <Icon name="location" size={10} color="#91908e" />
          <Text
            style={{
              color: '#181818',
              fontSize: 10,
              marginVertical: 4,
              fontFamily: 'Inter-SemiBold',
            }}>
            {' '}
            {shop.textAddress}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
            padding: 5,
            backgroundColor: 'green',
            width: 60,
            borderRadius: 10,
          }}>
          <Icon name="star" size={10} color="#fff" />
          <Text
            style={{
              color: '#fff',
              fontSize: 12,
              fontFamily: 'Nunito-SemiBold',
            }}>
            {' '}
            {shop.rating}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const ItemCard: React.FC<{
  item: Item;
  navigation:
    | ShopNavigation
    | ResultNavigation
    | LikedNavigation
    | MLResNavigation;
  shopNameVisible?: boolean;
}> = ({item, navigation, shopNameVisible = true}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15,
        borderBottomWidth: 1,
        paddingVertical: 15,
        borderColor: '#f5f5f5',
      }}>
      <View
        style={{
          padding: 10,
          justifyContent: 'space-between',
          maxWidth: '60%',
        }}>
        <View
          style={{
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Nunito-Bold',
              color: '#181818',
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Nunito-SemiBold',
              color: '#828181',
            }}>
            {item.category}
          </Text>
        </View>
        {shopNameVisible && (
          <Text
            style={{
              fontSize: 18,
              marginTop: 5,
              marginBottom: 18,
              fontFamily: 'Nunito-SemiBold',
            }}>
            {shops.find(shop => String(shop.id) === item.from)?.name}
          </Text>
        )}
        <Text
          style={{
            fontSize: 12,
            color: '#777777',
            fontFamily: 'Nunito-Regular',
          }}>
          MRP: {item.price}/-
        </Text>
      </View>
      <View
        style={{
          position: 'relative',
        }}>
        <Image
          source={{uri: item.pic}}
          style={{
            width: 140,
            height: 140,
            borderRadius: 10,
            position: 'relative',
            zIndex: 1,
          }}
        />
        <Pressable
          onPress={() => {
            navigation.navigate('order', {item: item});
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#d6620f',
            maxWidth: 90,
            alignSelf: 'center',
            position: 'absolute',
            zIndex: 2,
            backgroundColor: '#fcf8f5',
            paddingVertical: 8,
            paddingHorizontal: 18,
            bottom: -10,
          }}>
          <Text
            style={{
              color: '#d6620f',
              fontSize: 12,
              fontFamily: 'Nunito-Bold',
            }}>
            ORDER
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
