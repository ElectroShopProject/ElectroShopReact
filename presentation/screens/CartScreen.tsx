import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {BrandAppBar} from '../components/BrandAppBar';
import {
  Button,
  Flex,
  IconComponentProvider,
  Text,
} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {Product} from '../../data/models/Product';
import {Manufacturer} from '../../data/models/Manufacturer';
import {ProductItem} from '../components/ProductItem';
import Toast from 'react-native-toast-message';

export const CartScreen: ({navigation}) => Node = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const loadCart = async () => {
    try {
      const response = await fetch(
        'https://electroshopapi.herokuapp.com/cart/' + global.cartId,
      );
      const json = await response.json();
      setData(json);
      console.log('Cart = ' + json);
      return json;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeProductFromCart = async (id: string) => {
    try {
      // Then add product
      await fetch('https://electroshopapi.herokuapp.com/cart/products/remove', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartId: global.cartId,
          productId: id,
        }),
      });
      await loadCart();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <SafeAreaView flex={1}>
        <StatusBar />
        <BrandAppBar allowBack={true} navigation={navigation} />
        <ScrollView>
          <Flex items={'center'} padding={64} backgroundColor={'#EEE'}>
            <Text variant={'h4'}>Your cart</Text>
          </Flex>
          {isLoading ? ( //TODO Center loading and fix scroll
            <ActivityIndicator size="large" color="black" center />
          ) : (
            <Flex fill>
              <ScrollView horizontal={true}>
                <FlatList
                  data={data.products}
                  keyExtractor={product => product.id}
                  renderItem={({item}) => {
                    let createdProduct = Product.create({
                      id: item.id,
                      name: item.name,
                      category: item.category,
                      netPrice: item.netPrice,
                      grossPrice: item.grossPrice,
                      taxRate: item.taxRate,
                      manufacturer: Manufacturer.create({
                        id: item.manufacturer.id,
                        name: item.manufacturer.name,
                        country: item.manufacturer.country,
                      }),
                    });

                    return (
                      <ProductItem
                        isCartProduct={true}
                        product={createdProduct}
                        onAction={() => {
                          setLoading(!isLoading);
                          removeProductFromCart(createdProduct.id);
                          Toast.show({
                            position: 'bottom',
                            type: 'success',
                            text1: 'Added to cart',
                          });
                        }}
                      />
                    );
                  }}
                />
              </ScrollView>
            </Flex>
          )}
        </ScrollView>
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 24,
          }}>
          <Text>Some text</Text>
          <Button title={'Finalize order'} />
        </View>
      </SafeAreaView>
    </IconComponentProvider>
  );
};
