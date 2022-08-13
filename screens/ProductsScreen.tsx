import {StatusBar, View,} from 'react-native';
import {Text} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {FullScreen} from "../components/FullScreen";
import {Expand} from "../components/Expand";
import {Center} from "../components/Center";
import {ElasticList} from "../components/ElasticList";
import {ProductItem} from "../components/ProductItem";
import {Product} from "../data/models/Product";
import {Manufacturer} from "../data/models/Manufacturer";
import Toast from "react-native-toast-message";
import {BrandAppBar} from "../components/BrandAppBar";
import {TextHeader} from "../components/TextHeader";
import {StateWrapper} from "../components/StateWrapper";

export const ProductsScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]); // Array of products

    const getProducts = async () => {
        try {
            const response = await fetch(
                'https://electroshopapi.herokuapp.com/products',
            );
            return await response.json();
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
        let isMounted = true;               // note mutable flag
        getProducts().then(data => {
            if (isMounted) setData(data);    // add conditional check
        })
        return () => {
            isMounted = false
        };
    }, []);

    return (
        <FullScreen>
            <StatusBar/>
            <BrandAppBar allowBack={true} showCart={true} navigation={navigation}/>
            <StateWrapper isLoading={isLoading}>
                <TextHeader text={'Products'}/>
                <ElasticList
                    data={data}
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
            </StateWrapper>
        </FullScreen>
        // <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        //   <SafeAreaView>
        //     <StatusBar />
        //     <BrandAppBar allowBack={true} showCart={true} navigation={navigation} />
        //     <ScrollView>
        //       <Flex items={'center'} style={{padding: 64, backgroundColor: '#EEE'}}>
        //         <Text variant={'h4'}>Products</Text>
        //       </Flex>
        //       {isLoading ? ( //TODO Center loading and fix scroll
        //         <ActivityIndicator size="large" color="black" />
        //       ) : (
        //         <Flex fill>
        //           <ScrollView horizontal={true}>
        //             <FlatList
        //                 style={{backgroundColor: 'red'}}
        //               data={data}
        //               keyExtractor={product => product.id}
        //               numColumns={2}
        //               renderItem={({item}) => {
        //                 let createdProduct = Product.create({
        //                   id: item.id,
        //                   name: item.name,
        //                   category: item.category,
        //                   netPrice: item.netPrice,
        //                   grossPrice: item.grossPrice,
        //                   taxRate: item.taxRate,
        //                   manufacturer: Manufacturer.create({
        //                     id: item.manufacturer.id,
        //                     name: item.manufacturer.name,
        //                     country: item.manufacturer.country,
        //                   }),
        //                 });
        //
        //                 return (
        //                   <ProductItem
        //                     isCartProduct={false}
        //                     product={createdProduct}
        //                     onAction={() => {
        //                       setLoading(!isLoading);
        //                       addProductToCart(createdProduct.id);
        //                       Toast.show({
        //                         position: 'bottom',
        //                         type: 'success',
        //                         text1: 'Added to cart',
        //                       });
        //                     }}
        //                   />
        //                 );
        //               }}
        //             />
        //           </ScrollView>
        //         </Flex>
        //       )}
        //     </ScrollView>
        //   </SafeAreaView>
        // </IconComponentProvider>
    );
};
