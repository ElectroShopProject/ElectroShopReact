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

export const LoginScreen: () => Node = () => {
  const [text, setText] = useState('');
  const [isLoading, setLoading] = useState(false);

  const postLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://electroshopapi.herokuapp.com/products',
        {
          method: 'POST',
          body: JSON.stringify({
            name: {text},
          }),
        },
      );
      await response.json();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
