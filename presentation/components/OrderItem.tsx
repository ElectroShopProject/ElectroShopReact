import {Divider, Flex, Surface, Text} from '@react-native-material/core';
import React from 'react';
import {Product} from '../../data/models/Product';
import {View} from 'react-native';
import {Order} from '../../data/models/Order';

export const OrderItem = (props: {order: Order}): Node => {
  function getCountedProducts(products: Product[]) {
    // TODO Remove ignores
    let countedProducts = new Map<string, number>();
    // @ts-ignore
    let uniqueProductIds = [
      // @ts-ignore
      ...new Set(products.map((product: Product) => product.id)),
    ];

    uniqueProductIds.forEach((uniqueProductId: string) => {
      countedProducts.set(
        uniqueProductId,
        products.filter((product: Product) => product.id === uniqueProductId)
          .length,
      );
    });

    return countedProducts;
  }

  // TODO Return list of widgets
  function getProductItems(products: Product[], map: Map<string, number>) {
    return Array.from(map).map(([key, count]) => {
      let foundProduct = products.find(
        (product: Product) => product.id === key,
      );
      return <Text>{'Product ' + count + 'x ' + foundProduct.name}</Text>;
    });
  }

  return (
    <Flex fill style={{marginHorizontal: 16, marginVertical: 8}}>
      <Surface elevation={4} category="large" style={{padding: 8}}>
        <Flex inline={true} spacing={8}>
          <Flex fill>
            <Text variant={'h6'}>Products: </Text>
            {getProductItems(
              props.order.products,
              getCountedProducts(props.order.products),
            )}
            <View height={8} />
            <Divider inset={32} />
            <View height={8} />
            <Flex fill inline justify={'between'}>
              <Text>{''}</Text>

              <Text>{props.order.payment?.amount ?? 13.99}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Surface>
    </Flex>
  );
};
