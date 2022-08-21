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
import {PlatformBottomSheet, PlatformBottomSheetItem} from "../components/PlatformBottomSheet";

// TODO Fix navigation on web
export const CartScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [isPaymentSheetVisible, setPaymentSheetVisible] = useState(false);
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
            await loadPaymentOptions();
            return json;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const loadPaymentOptions = async () => {
        try {
            const response = await fetch(
                // TODO Extract base url and endpoints
                'https://electroshopapi.herokuapp.com/summary/payment/options',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            const json = await response.json();
            setPaymentOptions(json);
            console.log('Payment options = ' + json.toString());
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
            const products = (data as Cart)?.products;
            if (products === undefined || products.length == 0) {
                // TODO Extract to platform toast
                Toast.show({
                    position: 'bottom',
                    type: 'error',
                    text1: 'You have no products to purchase!',
                });
                return
            }
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
            setPaymentSheetVisible(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const postPayment = async (type: string) => {
        try {
            setPaymentSheetVisible(false);
            setLoading(true);
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
            setLoading(false);
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
                <CheckoutBar data={data as Cart} onFinalize={() => finalize()}/>
                <PlatformBottomSheet
                    isVisible={isPaymentSheetVisible}
                    onClose={() => setPaymentSheetVisible(false)}
                    items={paymentOptions.map((item) => PlatformBottomSheetItem.create({name: item.type, isAvailable: item.isAvailable}))}
                    onItemPressed={index => {
                        postPayment(paymentOptions[index].type)
                    }}
                />
            </StateWrapper>
        </FullScreen>
    );
};
