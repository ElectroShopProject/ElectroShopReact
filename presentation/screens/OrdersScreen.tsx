import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {BrandAppBar} from '../components/BrandAppBar';
import {
  Button,
  Flex,
  IconComponentProvider,
  Text,
} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {OrderItem} from '../components/OrderItem';

export const OrdersScreen: (navigation: any) => Node = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]); // Array of products

  const createCart = async () => {
    try {
      const response = await fetch(
        'https://electroshopapi.herokuapp.com/cart',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userId: global.userId}),
        },
      );
      const cart = await response.json();
      global.cartId = cart.id;
      console.log(global.cartId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getOrders = async () => {
    try {
      const response = await fetch(
        'https://electroshopapi.herokuapp.com/user/orders?userId=' +
          global.userId,
      );
      const json = await response.json();
      setData(json);
      console.log(json);
      await createCart();
      return json;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar />
        <BrandAppBar allowBack={false} navigation={navigation} />
        <Flex items={'center'} padding={64} backgroundColor={'#EEE'}>
          <Text variant={'h4'}>Orders</Text>
        </Flex>
        <ScrollView>
          <ScrollView horizontal={true}>
            {isLoading ? ( //TODO Center loading and fix scroll
              <ActivityIndicator size="large" color="black" center />
            ) : (
              <Flex>
                <FlatList
                  data={data}
                  keyExtractor={order => order.id}
                  renderItem={({item}) => <OrderItem order={item} />}
                />
              </Flex>
            )}
          </ScrollView>
        </ScrollView>
        <Button
          title={'Create new order'}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            margin: 32,
          }}
          onPress={() => {
            navigation.navigate('Products');
          }}
        />
      </SafeAreaView>
    </IconComponentProvider>
  );
};
