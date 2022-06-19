import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import {BrandAppBar} from '../components/BrandAppBar';
import {Flex, IconComponentProvider, Text} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {Product} from '../../data/models/Product';
import {Manufacturer} from '../../data/models/Manufacturer';
import {ProductItem} from '../components/ProductItem';
import Toast from 'react-native-toast-message';

export const OrdersScreen: (navigation: any) => Node = ({navigation}) => {
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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <SafeAreaView>
        <StatusBar />
        <BrandAppBar />
        <Flex items={'center'} padding={64} backgroundColor={'#EEE'}>
          <Text variant={'h4'}>Orders</Text>
        </Flex>
        <ScrollView>
          {isLoading ? ( //TODO Center loading and fix scroll
            <ActivityIndicator size="large" color="black" center />
          ) : (
            <Flex fill>
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
                    <TouchableHighlight
                      onPress={() => {
                        navigation.navigate('Products');
                      }}
                      underlayColor="white">
                      <ProductItem
                        product={createdProduct}
                        onAddToCart={() => {
                          setLoading(!isLoading);
                          Toast.show({
                            position: 'bottom',
                            type: 'success',
                            text1: 'Added to cart',
                          });
                        }}
                      />
                    </TouchableHighlight>
                  );
                }}
              />
            </Flex>
          )}
        </ScrollView>
      </SafeAreaView>
    </IconComponentProvider>
  );
};
