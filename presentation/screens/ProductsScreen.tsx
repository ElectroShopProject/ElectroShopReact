import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {BrandAppBar} from '../components/BrandAppBar';
import {Flex, IconComponentProvider, Text} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {Product} from '../../data/models/Product';
import {Manufacturer} from '../../data/models/Manufacturer';
import {ProductItem} from '../components/ProductItem';
import Toast from 'react-native-toast-message';

export const ProductsScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]); // Array of products

  const getProducts = async () => {
    try {
      const response = await fetch(
        'https://electroshopapi.herokuapp.com/products',
      );
      const json = await response.json();
      setData(json);
      return json;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addProductToCart = async (id: string) => {
    try {
      // Then add product
      await fetch('https://electroshopapi.herokuapp.com/cart/products/add', {
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <SafeAreaView>
        <StatusBar />
        <BrandAppBar allowBack={true} showCart={true} navigation={navigation} />
        <ScrollView>
          <Flex items={'center'} padding={64} backgroundColor={'#EEE'}>
            <Text variant={'h4'}>Products</Text>
          </Flex>
          {isLoading ? ( //TODO Center loading and fix scroll
            <ActivityIndicator size="large" color="black" center />
          ) : (
            <Flex fill>
              <ScrollView horizontal={true}>
                <FlatList
                  data={data}
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
                        isCartProduct={false}
                        product={createdProduct}
                        onAction={() => {
                          setLoading(!isLoading);
                          addProductToCart(createdProduct.id);
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
      </SafeAreaView>
    </IconComponentProvider>
  );
};
