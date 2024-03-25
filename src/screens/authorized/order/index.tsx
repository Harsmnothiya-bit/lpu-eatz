import * as React from 'react';
import type {OrderProps} from './types';
import {
  Alert,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {db} from '../../../libs/db';
import {order} from '../../../libs/db/schemas/order';
import {useAuth, useLiked} from '../../../hooks';
import {shops} from '../../../data';
import Icon from 'react-native-vector-icons/Ionicons';

export const OrderScreen: React.FC<OrderProps> = React.memo(
  ({route, navigation}) => {
    const {item} = route.params;
    const shopName = shops.find(shop => String(shop.id) === item.from);
    const {user} = useAuth();
    const convertToTitleCase = (str: string) => {
      return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
    const {liked, add, remove} = useLiked();
    const [isLiked, setIsLiked] = React.useState(
      liked.some(likedItem => likedItem.id === item.id),
    );
    React.useEffect(() => {
      setIsLiked(liked.some(likedItem => likedItem.id === item.id));
    }, [item.id, liked]);
    return (
      <View
        style={{
          flex: 1,
          padding: 15,
          justifyContent: 'space-between',
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
                uri: item.pic,
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
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Nunito-SemiBold',
                    color: '#181818',
                  }}>
                  {`(${item.category})`}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Nunito-Bold',
                    color: '#181818',
                  }}>
                  ₹ {item.price}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Nunito-Bold',
                color: '#181818',
              }}>
              Offered by{' '}
              {shopName ? convertToTitleCase(shopName.name) : 'Unknown'}
            </Text>
            <View>
              <Icon
                name={isLiked ? 'heart' : 'heart-outline'}
                onPress={() => {
                  if (isLiked) {
                    remove(item);
                  } else {
                    add(item);
                  }
                }}
                style={{position: 'absolute', right: 0}}
                size={24}
                color="#d6620f"
              />
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
              Sugar - {item.sugar}g,
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginVertical: 5,
                fontFamily: 'Nunito-SemiBold',
                color: '#181818',
              }}>
              Protein - {item.protein}g
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginVertical: 5,
                fontFamily: 'Nunito-SemiBold',
                color: '#181818',
              }}>
              Vitamins - {item.vitamin}mg
            </Text>
          </View>
          <Text
            style={{
              fontSize: 20,
              marginVertical: 5,
              fontFamily: 'Nunito-SemiBold',
              color: '#181818',
            }}>
            Time to prepare: {item.prep_time} minutes
          </Text>
        </View>
        <TouchableOpacity
          onPress={async () => {
            try {
              Toast.show({
                type: 'info',
                text1: 'Placing Order',
                text2: 'Please wait while we place your order',
              });
              const res = await db.insert(order).values({
                itemId: Number(item.id),
                user: String(user?.email),
              });
              Toast.show({
                type: 'success',
                text1: 'Order Placed',
                text2: 'Your order has been placed successfully',
              });
              console.log(res);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Something went wrong');
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
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
);
