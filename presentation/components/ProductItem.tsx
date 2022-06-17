import {
  Flex,
  Icon,
  IconButton,
  Surface,
  Text,
} from '@react-native-material/core';
import React from 'react';
import {Product} from '../../data/models/Product';

export const ProductItem = (value: {product: Product}): Node => {
  console.log(value.product);
  return (
    <Flex
      flex={1}
      fill={true}
      style={{marginHorizontal: 16, marginVertical: 8}}>
      <Surface elevation={4} category="large" style={{padding: 8}}>
        <Flex inline={true} spacing={8}>
          <Flex fill={true} inline={true} wrap={true}>
            <Text variant={'h6'}>{value.product.name}</Text>
            <Text>{value.product.manufacturer}</Text>
          </Flex>
          <Flex fill={false} center={true}>
            <IconButton icon={<Icon name="cart-plus" size={24} />} />
          </Flex>
        </Flex>
      </Surface>
    </Flex>
  );
};
