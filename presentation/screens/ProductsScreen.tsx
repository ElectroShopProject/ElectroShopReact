import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {BrandAppBar} from '../components/BrandAppBar';
import {Flex, IconComponentProvider} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {ProductItem} from '../components/ProductItem';
import {Product} from '../../data/models/Product';

export const ProductsScreen: () => Node = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]); // Array of products

  const getProducts = async () => {
    try {
      const response = await fetch(
        'https://electroshopapi.herokuapp.com/products',
      );
      const json = await response.json();
      setData(json);
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
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Flex>
            <FlatList
              data={data}
              keyExtractor={({product, _}) => new Product()}
              renderItem={product => <ProductItem product={new Product()} />}
            />
          </Flex>
        )}
      </SafeAreaView>
    </IconComponentProvider>
  );
};
