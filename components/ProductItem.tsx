import {
    Divider,
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
import {Product} from '../data/models/Product';
import {View} from 'react-native';
import {Expand} from "./Expand";
import {Center} from "./Center";

export const ProductItem = (value: {
    product: Product;
    onAction: Function;
    isCartProduct: boolean;
}) => {
    return (
        <Expand>
            <Center>
                <Text>ABCD</Text>
            </Center>
        </Expand>
        // <Flex
        //   fill={true}
        //   style={{marginHorizontal: 16, marginVertical: 8}}>
        //   <Surface elevation={4} category="large" style={{padding: 8}}>
        //     <Flex inline={true} style={{padding: 8}}>
        //       <Flex fill={true} inline={true} wrap={true}>
        //         <VStack fill={true}>
        //           <Text variant={'h6'}>{value.product.name}</Text>
        //           <Text style={{fontWeight: 'bold'}}>
        //             {value.product.manufacturer.name}
        //           </Text>
        //           <View style={{height: 8}} />
        //           <Divider inset={32} />
        //           <View style={{height: 8}} />
        //           <HStack items={'baseline'}>
        //             <Text>{value.product.category}</Text>
        //             <Spacer />
        //             <Text style={{fontSize: 12}}>
        //               {value.product.netPrice.toFixed(2)}
        //             </Text>
        //             <View style={{width: 8}} />
        //             <Text style={{fontSize: 24, fontWeight: 'bold'}}>
        //               {value.product.grossPrice.toFixed(2)}
        //             </Text>
        //           </HStack>
        //         </VStack>
        //       </Flex>
        //       <Flex fill={false} center={true}>
        //         <IconButton
        //             style={{margin: 8}}
        //           icon={
        //             value.isCartProduct ? (
        //               <Icon name="delete" size={24} />
        //             ) : (
        //               <Icon name="cart-plus" size={24} />
        //             )
        //           }
        //           onPress={() => value.onAction()}
        //         />
        //       </Flex>
        //     </Flex>
        //   </Surface>
        // </Flex>
    );
};
