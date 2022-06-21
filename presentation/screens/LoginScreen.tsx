import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image, SafeAreaView} from 'react-native';
import {
  Button,
  Flex,
  IconComponentProvider,
  TextInput,
  Spacer,
} from '@react-native-material/core';
import React, {useState} from 'react';
import {LoaderOverlay} from '../components/LoaderOverlay';

export const LoginScreen: (navigation: any) => Node = ({navigation}) => {
  const [text, setText] = useState('');
  const [isLoading, setLoading] = useState(false);

  const postLogin = async () => {
    try {
      setLoading(true);
      console.log(text);
      const response = await fetch(
        'https://electroshopapi.herokuapp.com/user/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: text,
          }),
        },
      );
      const data = await response.json();
      global.userId = data.id;
      console.log(data);
      navigation.replace('Orders');
    } catch (error) {
      console.error(error);
    } finally {
      try {
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <SafeAreaView style={{flex: 1}}>
        {isLoading ? (
          <LoaderOverlay />
        ) : (
          <Flex fill>
            <Flex fill center>
              <Image
                source={require('../../assets/images/logo.png')}
                style={{
                  aspectRatio: 4.0,
                  resizeMode: 'contain',
                }}
              />
            </Flex>

            <Flex fill padding={16}>
              <TextInput
                defaultValue={text}
                helperText={'Enter your login'}
                onChangeText={newText => setText(newText)}
              />
              <Spacer />
              <Button title={'Done'} onPress={() => postLogin()} />
            </Flex>
          </Flex>
        )}
      </SafeAreaView>
    </IconComponentProvider>
  );
};
