import {
  Flex,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Surface,
  Text,
  VStack,
} from '@react-native-material/core';
import React from 'react';
import {Product} from '../../data/models/Product';
import {View} from 'react-native';

export const ProductItem = (value: {product: Product}): Node => {
  return (
    <Flex
      flex={1}
      fill={true}
      style={{marginHorizontal: 16, marginVertical: 8}}>
      <Surface elevation={4} category="large" style={{padding: 8}}>
        <Flex inline={true} spacing={8}>
          <Flex fill={true} inline={true} wrap={true}>
            <VStack fill={true}>
              <Text variant={'h6'}>{value.product.name}</Text>
              <Text style={{fontWeight: 'bold'}}>
                {value.product.manufacturer.name}
              </Text>
              <HStack items={'baseline'}>
                <Text>{value.product.category}</Text>
                <Spacer />
                <Text style={{fontSize: 12}}>{value.product.netPrice}</Text>
                <View width={8} />
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                  {value.product.grossPrice}
                </Text>
              </HStack>
            </VStack>
          </Flex>
          <Flex fill={false} center={true}>
            <IconButton icon={<Icon name="cart-plus" size={24} />} />
          </Flex>
        </Flex>
      </Surface>
    </Flex>
  );
};
