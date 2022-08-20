import {
    StatusBar,
    View,
} from 'react-native';
import {BrandAppBar} from '../components/BrandAppBar';
import {
    Button,
    Divider,
    Flex,
    Text,
} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {Product} from '../data/models/Product';
import {Manufacturer} from '../data/models/Manufacturer';
import {ProductItem} from '../components/ProductItem';
import Toast from 'react-native-toast-message';
import {BottomSheet} from 'react-native-btr';
import {Cart} from "../data/models/Cart";
import {FullScreen} from "../components/FullScreen";
import {StateWrapper} from "../components/StateWrapper";
import {ElasticList} from "../components/ElasticList";
import {TextHeader} from "../components/TextHeader";
import {CheckoutBar} from "../components/CheckoutBar";

// TODO Fix navigation on web
export const CartScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({});

    const loadCart = async () => {
        try {
            const response = await fetch(
                // TODO Extract base url and endpoints
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

    const finalize = async () => {
        try {
            // Then add product
            await fetch('https://electroshopapi.herokuapp.com/summary/completion', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartId: global.cartId,
                }),
            });
            toggleBottomNavigationView();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const postPayment = async (type: string) => {
        try {
            // Then add product
            await fetch('https://electroshopapi.herokuapp.com/summary/payment', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartId: global.cartId,
                    paymentOptionType: type,
                }),
            });
            toggleBottomNavigationView();
            navigation.replace('Orders');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        // setVisible(!visible);
    };

    return (
        <FullScreen>
            <StatusBar/>
            <BrandAppBar
                allowBack={true}
                showCart={false}
                navigation={navigation}/>
            <TextHeader text={"Your cart"}/>
            <StateWrapper isLoading={isLoading}>
                <ElasticList
                    data={(data as Cart)?.products ?? []}
                    renderItem={({item}) => {
                        // TODO Extract creating product in project
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
                            // TODO Extract showing toast
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
                    }}/>
                <CheckoutBar data={data as Cart} onFinalize={finalize()}/>
            </StateWrapper>
        </FullScreen>
    );
};
