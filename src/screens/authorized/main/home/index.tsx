import * as React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import type {HomeNavigation, HomeProps} from './types';
import {Card} from '../../../../components/Card';
import {shops} from '../../../../data';
import {useAuth} from '../../../../hooks';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import animation from '../../../../assets/animations/5678.json';

export const HomeScreen: React.FC<HomeProps> = React.memo(({navigation}) => {
  const clickSearch = () => {
    navigation.navigate('search');
  };
  return (
    <FlatList
      ListHeaderComponent={
        <ListHeaderComponent onClick={clickSearch} navigation={navigation} />
      }
      contentContainerStyle={{paddingBottom: 100, padding: 10}}
      data={shops
        .sort((a, b) => {
          if (a.rating > b.rating) {
            return -1;
          }
          if (a.rating < b.rating) {
            return 1;
          }
          return 0;
        })
        .slice(0, 3)}
      ListFooterComponent={<Footer navigation={navigation} />}
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
});

type headerProps = {
  onClick: () => void;
  navigation: HomeNavigation;
};
const ListHeaderComponent: React.FC<headerProps> = React.memo(
  ({onClick, navigation}) => {
    const {width} = useWindowDimensions();
    const {user} = useAuth();
    return (
      <View
        style={{
          width: width - 20,
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 10,
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 24,
              color: '#d6620f',
              fontFamily: 'Pacifico-Regular',
            }}>
            LPU EATZZ
          </Text>
          {!user?.picture ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#edc861',
                borderRadius: 50,
                width: 35,
                height: 35,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#777777',
                }}>
                {user?.email[0].toUpperCase()}
              </Text>
            </View>
          ) : (
            <Image
              source={{uri: user?.picture}}
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,
              }}
            />
          )}
        </View>
        <Pressable
          onPress={onClick}
          style={{
            backgroundColor: '#fff',
            elevation: 10,
            padding: 10,
            borderRadius: 50,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <Icon name="search" size={20} color="#777777" />
          <Text style={{color: '#777777'}}>
            Search for cafeterias, vendors, etc.
          </Text>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            elevation: 10,
            backgroundColor: '#f5efe6',
            padding: 10,
            borderRadius: 25,
            marginVertical: 10,
            alignItems: 'center',
          }}>
          <LottieView
            source={animation}
            autoPlay
            loop
            style={{
              width: '50%',
              height: 200,
            }}
          />
          <View
            style={{
              maxWidth: '50%',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Nunito-Bold',
                color: '#d6620f',
              }}>
              Try our new ML model to find the best food for you! 🤩
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('suggest');
              }}
              style={{
                backgroundColor: '#d6620f',
                padding: 10,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Nunito-SemiBold',
                }}>
                Check Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#d6620f',
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Nunito-Bold',
              color: '#d6620f',
            }}>
            Explore ☕🍞
          </Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#d6620f',
            }}
          />
        </View>
      </View>
    );
  },
);

type FooterProps = {
  navigation: HomeNavigation;
};
const Footer: React.FC<FooterProps> = React.memo(({navigation}) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('explore');
      }}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        elevation: 10,
        backgroundColor: '#d6620f',
        borderRadius: 30,
        marginVertical: 10,
      }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Inter-Bold',
          color: '#fff',
        }}>
        {'View More'}
      </Text>
    </Pressable>
  );
});
