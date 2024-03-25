import * as React from 'react';
import {Image, Pressable, RefreshControl, Text, View} from 'react-native';
import {items, shops} from '../../../../data';

import type {OrderNavigation, OrderProps} from './types';
import {useAuth} from '../../../../hooks';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {db} from '../../../../libs/db';
import {Order, order} from '../../../../libs/db/schemas/order';
import {FlatList} from 'react-native-gesture-handler';
import {eq} from 'drizzle-orm';

export const OrdersScreen: React.FC<OrderProps> = React.memo(({navigation}) => {
  const {user} = useAuth();
  const [userOrders, setUserOrders] = React.useState<Order[]>([]);
  const getOrders = React.useCallback(async () => {
    try {
      const userOrder = await db
        .select()
        .from(order)
        .where(eq(order.user, user?.email!));
      if (userOrder) {
        setUserOrders(userOrder);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error fetching orders',
      });
    }
  }, [user?.email]);

  React.useEffect(() => {
    navigation.addListener('focus', getOrders);

    return () => {
      navigation.removeListener('focus', getOrders);
    };
  }, [navigation, getOrders]);

  return (
    <FlatList
      refreshing={false}
      data={userOrders.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )}
      onRefresh={getOrders}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={getOrders} />
      }
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={header}
      contentContainerStyle={{paddingBottom: 100, padding: 10}}
      keyExtractor={item => String(item.id)}
      renderItem={({item}) => (
        <OrderItem navigation={navigation} order={item} />
      )}
    />
  );
});

const ListEmptyComponent: React.FC = React.memo(() => {
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 12,
          fontFamily: 'Nunito-Bold',
          color: '#242424',
        }}>
        No Orders
      </Text>
    </View>
  );
});

type OrderItemProps = {
  order: Order;
  navigation: OrderNavigation;
};
const OrderItem: React.FC<OrderItemProps> = React.memo(
  ({order: thisOrder, navigation}) => {
    const thisItem = items.find(item => item.id === String(thisOrder.itemId));
    if (!thisItem) {
      return null;
    }
    const thisShop = shops.find(shop => String(shop.id) === thisItem.from);
    if (!thisShop) {
      return null;
    }
    const {status} = thisOrder;
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
              {thisItem.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Nunito-SemiBold',
                color: '#828181',
              }}>
              {thisItem.category}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 18,
              marginTop: 5,
              marginBottom: 18,
              fontFamily: 'Nunito-SemiBold',
            }}>
            {shops.find(shop => String(shop.id) === thisItem.from)?.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            {status === 'completed' ? (
              <Icon name="checkmark-done" size={15} color="green" />
            ) : status === 'cancelled' ? (
              <Icon name="close" size={15} color="red" />
            ) : (
              <Icon name="ellipsis-horizontal" size={15} color="blue" />
            )}
            <Text
              style={{
                color:
                  status === 'completed'
                    ? 'green'
                    : status === 'cancelled'
                    ? 'red'
                    : 'blue',
              }}>
              {' '}
              {status === 'completed'
                ? 'Completed'
                : status === 'cancelled'
                ? 'Cancelled'
                : 'Processing'}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 12,
              color: '#777777',
              fontFamily: 'Nunito-Regular',
            }}>
            MRP: {thisItem.price}/-
          </Text>
        </View>
        <View
          style={{
            position: 'relative',
          }}>
          <Image
            source={{uri: thisItem.pic}}
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
              navigation.navigate('details', {
                item: thisOrder,
              });
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
              bottom: 0,
            }}>
            <Text
              style={{
                color: '#d6620f',
                fontSize: 12,
                fontFamily: 'Nunito-Bold',
              }}>
              View
            </Text>
          </Pressable>
        </View>
      </View>
    );
  },
);

const header: React.FC = React.memo(() => {
  const {user, logOutUser} = useAuth();
  return (
    <View
      style={{
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: user?.picture!}}
          style={{width: 50, height: 50, borderRadius: 50}}
        />
        <Icon
          name="log-out"
          size={30}
          onPress={logOutUser}
          style={{padding: 10, color: '#d6620f'}}
        />
      </View>
      <Text
        style={{
          fontSize: 30,
          marginVertical: 10,
          fontFamily: 'Nunito-Bold',
          color: '#242424',
        }}>
        Your Orders
      </Text>
    </View>
  );
});
