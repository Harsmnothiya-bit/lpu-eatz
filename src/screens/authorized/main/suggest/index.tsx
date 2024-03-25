import * as React from 'react';
import type {SuggestProps} from './types';
import {Text, ScrollView, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import animation from '../../../../assets/animations/5678.json';
import {Picker} from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const taste_profiles: string[] = [
  'spicy',
  'savory',
  'sweet',
  'creamy',
  'crispy',
  'crunchy',
  'tangy',
  'earthy',
  'rich',
  'cheesy',
  'sweet-spicy',
  'creamy-garlicky',
  'garlicky',
  'cheesy and savory',
  'crispy and savory',
  'refreshing and savory',
  'spicy and savory',
  'spicy, tangy, and savory',
  'creamy and savory',
  'grilled and savory',
  'sweet and creamy',
  'tangy and creamy',
  'chocolaty and creamy',
  'fruity and creamy',
  'refreshing and tangy',
  'refreshing and fruity',
  'vegetable-rich and savory',
  'refreshing and salty',
  'spicy and creamy',
  'tropical and creamy',
  'mild',
  'herby',
  'buttery',
  'refreshing',
  'chocolaty',
  'strong',
  'nutty',
  'caramely',
  'fruity',
  'berrylicious',
  'varied',
  'aromatic',
  'spongy',
  'soft',
];

export type SuggestResponse = {
  name: string;
  prep_time: number;
  protein: number;
  sugar: number;
  vitamin: number;
};

export const SuggestScreen: React.FC<SuggestProps> = React.memo(
  ({navigation}) => {
    const [taste, setTaste] = React.useState<string>('spicy');
    const [time, setTime] = React.useState<number>(10);
    const pickerRef = React.useRef(null);
    const timePickerRef = React.useRef(null);
    return (
      <ScrollView
        contentContainerStyle={{
          padding: 10,
          flex: 1,
        }}>
        <LottieView
          source={animation}
          autoPlay
          loop
          style={{
            width: 200,
            height: 200,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontFamily: 'Nunito-SemiBold',
            fontSize: 12,
            color: '#181818',
            maxWidth: '70%',
            textAlign: 'center',
            alignSelf: 'center',
          }}>
          Give us the type of taste you want and the time you can wait, we will
          suggest the best food for you using our self trained ML model
        </Text>
        <Text
          style={{
            fontFamily: 'Nunito-Bold',
            fontSize: 16,
            color: '#181818',
            marginTop: 20,
          }}>
          Select your taste profile
        </Text>
        <Picker
          ref={pickerRef}
          selectedValue={taste}
          style={{
            height: 50,
            width: '100%',
            marginTop: 20,
            marginBottom: 20,
            color: '#181818',
            backgroundColor: '#f0f0f0',
            borderRadius: 30,
          }}
          onValueChange={(itemValue, _) => setTaste(itemValue)}>
          {taste_profiles.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
        <Text
          style={{
            fontFamily: 'Nunito-Bold',
            fontSize: 16,
            color: '#181818',
          }}>
          Select the time you can wait
        </Text>
        <Picker
          ref={timePickerRef}
          selectedValue={time}
          style={{
            height: 50,
            width: '100%',
            marginTop: 20,
            marginBottom: 20,
            color: '#181818',
            backgroundColor: '#f0f0f0',
            borderRadius: 30,
          }}
          onValueChange={(itemValue, _) => setTime(itemValue)}>
          {Array.from({length: 7}, (_, i) => (
            <Picker.Item
              key={i}
              label={`${10 + i * 5} minutes`}
              value={10 + i * 5}
            />
          ))}
        </Picker>
        <TouchableOpacity
          onPress={async () => {
            try {
              Toast.show({
                type: 'info',
                text1: 'Suggesting Food',
                text2: 'Please wait while we suggest the best food for you',
              });
              const {data} = await axios.get<SuggestResponse[]>(
                `http://192.168.233.90:5000/suggest?time=${time}&taste=${taste}`,
              );
              navigation.navigate('mlres', {
                results: data,
              });
              Toast.hide();
            } catch (error: any) {
              console.log(error.message);
              Toast.show({
                type: 'error',
                text1: error.message,
                text2: 'Something went wrong',
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
            Suggest Me
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  },
);
