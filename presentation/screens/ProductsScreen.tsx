import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import {BrandAppBar} from '../components/BrandAppBar';
import {
  Flex,
  HStack,
  IconComponentProvider,
  Stack,
  Text,
} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {Product} from '../../data/models/Product';
import {Manufacturer} from '../../data/models/Manufacturer';
import {ProductItem} from '../components/ProductItem';

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
        <HStack>
          {isLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <Flex fill={1}>
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

                  return <ProductItem product={createdProduct} />;
                }}
              />
            </Flex>
          )}
        </HStack>
      </SafeAreaView>
    </IconComponentProvider>
  );
};
