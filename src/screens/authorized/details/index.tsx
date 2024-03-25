import * as React from 'react';
import type {DetailsProps} from './types';
import {
  Image,
  Linking,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {items, shops} from '../../../data';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {db} from '../../../libs/db';
import {order} from '../../../libs/db/schemas/order';
import {eq} from 'drizzle-orm';
import moment from 'moment';

export const DetailsScreen: React.FC<DetailsProps> = React.memo(
  ({route, navigation}) => {
    const {item: thisOrder} = route.params;
    const thisItem = items.find(item => item.id === String(thisOrder.itemId));
    if (!thisItem) {
      return null;
    }
    const thisShop = shops.find(shop => String(shop.id) === thisItem.from);
    if (!thisShop) {
      return null;
    }
    return (
      <View
        style={{
          flex: 1,
          padding: 15,
          justifyContent: 'space-between',
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
                `https://www.google.com/maps/dir/?api=1&destination=${thisShop.lat},${thisShop.long}`,
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
              Shop Directions
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              gap: 10,
            }}>
            <Image
              source={{
                uri: thisItem.pic,
              }}
              style={{width: '50%', height: 230, borderRadius: 25}}
              resizeMode="cover"
            />
            <View
              style={{
                maxWidth: '50%',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: 'Inter-Bold',
                    color: '#181818',
                  }}>
                  {thisItem.name}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Nunito-SemiBold',
                    color: '#181818',
                  }}>
                  {`(${thisItem.category})`}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Nunito-Bold',
                    color: '#181818',
                  }}>
                  ₹ {thisItem.price}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Nunito-SemiBold',
                color: '#181818',
              }}>
              Nutritional Information: {'(per 10g)'}
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginVertical: 5,
                fontFamily: 'Nunito-SemiBold',
                color: '#181818',
              }}>
              Sugar - {thisItem.sugar}g,
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginVertical: 5,
                fontFamily: 'Nunito-SemiBold',
                color: '#181818',
              }}>
              Protein - {thisItem.protein}g
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginVertical: 5,
                fontFamily: 'Nunito-SemiBold',
                color: '#181818',
              }}>
              Vitamins - {thisItem.vitamin}mg
            </Text>
          </View>
          <Text
            style={{
              fontSize: 20,
              marginVertical: 5,
              fontFamily: 'Nunito-SemiBold',
              color: '#181818',
            }}>
            Ordered {moment(thisOrder.created_at).fromNow()} from:
          </Text>
          <Text
            onPress={() => {
              navigation.navigate('shop', {
                shop: thisShop,
              });
            }}
            style={{
              fontSize: 20,
              marginVertical: 5,
              fontFamily: 'Nunito-Bold',
              color: '#d6620f',
            }}>
            {thisShop.name}
          </Text>
        </View>
        {thisOrder.status === 'pending' && (
          <TouchableOpacity
            onPress={async () => {
              try {
                Toast.show({
                  type: 'info',
                  text1: 'Cancelling Order',
                  text2: 'Please wait while we cancel your order',
                });
                await db
                  .update(order)
                  .set({
                    status: 'cancelled',
                  })
                  .where(eq(order.id, thisOrder.id));
                Toast.show({
                  type: 'success',
                  text1: 'Order Cancelled',
                  text2: 'Your order has been cancelled',
                });
                navigation.goBack();
              } catch (error) {
                Toast.show({
                  type: 'error',
                  text1: 'Failed to Cancel Order',
                  text2: 'Your order could not  be cancelled',
                });
              }
            }}
            style={{
              padding: 10,
              borderRadius: 25,
              backgroundColor: '#d6620f',
              elevation: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Inter-Bold',
                color: '#f5f5f5',
                textAlign: 'center',
              }}>
              Cancel Order
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);
