import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import {useAuth} from '../../../hooks';
import Icon from 'react-native-vector-icons/Ionicons';
import {Order, order as OrderTable} from '../../../libs/db/schemas/order';
import {items, shops} from '../../../data';
import {db} from '../../../libs/db';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import {eq} from 'drizzle-orm';

export const DashScreen: React.FC = () => {
  const {user} = useAuth();
  const [orders, setOrders] = React.useState<Order[] | null>(null);
  const shopId = shops.filter(shop => shop.name === user?.email)[0].id;
  const itemsOfThisShop = items.filter(item => item.from === shopId.toString());
  const getOrders = React.useCallback(async () => {
    try {
      const res = await db.select().from(OrderTable);
      const final = res
        .filter(order =>
          itemsOfThisShop
            .map(item => item.id)
            .includes(order.itemId.toString()),
        )
        .sort((a, b) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        })
        .sort((a, b) => {
          if (a.status === 'pending' && b.status === 'completed') {
            return -1;
          } else if (a.status === 'completed' && b.status === 'pending') {
            return 1;
          } else {
            return 0;
          }
        });

      setOrders(final);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch orders',
      });
    }
  }, [itemsOfThisShop]);
  React.useEffect(() => {
    getOrders();
  }, [getOrders]);
  return (
    <FlatList
      data={orders}
      contentContainerStyle={{
        padding: 10,
      }}
      refreshControl={
        <RefreshControl
          refreshing={items === null}
          onRefresh={getOrders}
          colors={['#fff']}
        />
      }
      ListHeaderComponent={
        <Header
          length={
            orders
              ? orders.filter(order => order.status === 'pending').length
              : 0
          }
        />
      }
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={item => item.id}
    />
  );
};

type ItemProps = {
  item: Order;
};
const Item: React.FC<ItemProps> = ({item}) => {
  return (
    <Pressable
      onPress={() => {
        if (item.status !== 'pending') {
          return;
        }
        Alert.alert(
          'Order Details',
          `Order ID: ${item.id}\nOrder Status: ${
            item.status
          }\nOrder Created At: ${moment(item.created_at).fromNow()}`,
          [
            {
              text: 'Mark as paid',
              onPress: async () => {
                try {
                  Toast.show({
                    type: 'info',
                    text1: 'Marking as Paid',
                    text2: 'Please wait...',
                  });
                  await db
                    .update(OrderTable)
                    .set({
                      status: 'completed',
                    })
                    .where(eq(OrderTable.id, item.id));
                  Toast.show({
                    type: 'success',
                    text1: 'Order Marked as Paid',
                    text2: 'Order has been marked as paid',
                  });
                } catch (error) {
                  Toast.show({
                    type: 'error',
                    text1: 'Failed to mark as paid',
                    text2: 'Failed to mark order as paid',
                  });
                }
              },
            },
            {
              text: 'Close',
              style: 'cancel',
            },
          ],
        );
      }}
      style={{
        marginVertical: 10,
        borderBottomColor: '#f0f0f0',
        paddingVertical: 10,
        borderBottomWidth: 0.8,
        flexDirection: 'row',
        gap: 10,
      }}>
      <Image
        source={{uri: items.find(i => i.id === item.itemId.toString())?.pic}}
        style={{
          width: '25%',
          height: 120,
          borderRadius: 20,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          justifyContent: 'space-between',
          marginVertical: 10,
          flex: 1,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              gap: 4,
              alignItems: 'baseline',
            }}>
            <Text
              style={{
                fontFamily: 'Nunito-Bold',
                fontSize: 20,
                color: '#181818',
              }}>
              {items.find(i => i.id === item.itemId.toString())?.name}
            </Text>
            <Text
              style={{
                fontFamily: 'Nunito-SemiBold',
                fontSize: 10,
                color: '#181818',
              }}>
              {`(${
                items.find(i => i.id === item.itemId.toString())?.category
              }0)`}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Nunito-SemiBold',
              fontSize: 12,
              color: '#181818',
            }}>
            {item.user}
          </Text>
          <Text
            style={{
              fontFamily: 'Nunito-SemiBold',
              fontSize: 12,
              color: '#181818',
            }}>
            {moment(item.created_at).fromNow()}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'Nunito-SemiBold',
            fontSize: 16,
            color: '#181818',
          }}>
          ₹ {items.find(i => i.id === item.itemId.toString())?.price}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
        }}>
        {item.status === 'pending' ? (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Icon
              name="time"
              size={20}
              style={{
                padding: 10,
                color: '#fce303',
              }}
            />
            <Text
              style={{
                fontFamily: 'Nunito-SemiBold',
                fontSize: 12,
                color: '#fce303',
              }}>
              Pending
            </Text>
          </View>
        ) : item.status === 'completed' ? (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Icon
              name="checkmark-done"
              size={20}
              style={{
                padding: 10,
                color: 'lightgreen',
              }}
            />
            <Text
              style={{
                fontFamily: 'Nunito-SemiBold',
                fontSize: 12,
                color: 'lightgreen',
              }}>
              Completed
            </Text>
          </View>
        ) : item.status === 'cancelled' ? (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Icon
              name="close"
              size={20}
              style={{
                padding: 10,
                color: 'red',
              }}
            />
            <Text
              style={{
                fontFamily: 'Nunito-SemiBold',
                fontSize: 12,
                color: 'red',
              }}>
              Cancelled
            </Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

type HeaderProps = {
  length: number;
};
const Header: React.FC<HeaderProps> = React.memo(({length}) => {
  const {user, logOutUser} = useAuth();
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 24,
            flex: 1,
            color: '#d6620f',
            fontFamily: 'Nunito-Bold',
          }}>
          Hi!! {user?.email}
        </Text>
        <Icon
          name="log-out"
          size={30}
          onPress={logOutUser}
          style={{
            padding: 10,
            color: '#d6620f',
          }}
        />
      </View>
      <Text
        style={{
          fontFamily: 'Nunito-SemiBold',
          fontSize: 12,
          color: '#181818',
          maxWidth: '70%',
        }}>
        Welcome to your dashboard, here you can see all the orders you have
        received
      </Text>
      <Text
        style={{
          fontFamily: 'Nunito-Bold',
          fontSize: 16,
          color: '#181818',
          marginTop: 20,
        }}>
        {length === 0
          ? 'No active orders yet'
          : `You have ${length} active orders`}
      </Text>
    </View>
  );
});
