import {StatusBar} from 'react-native';
import {BrandAppBar} from '../components/BrandAppBar';
import React, {useEffect, useState} from 'react';
import {Product} from '../data/models/Product';
import {Manufacturer} from '../data/models/Manufacturer';
import {ProductItem} from '../components/ProductItem';
import {Cart} from "../data/models/Cart";
import {FullScreen} from "../components/FullScreen";
import {StateWrapper} from "../components/StateWrapper";
import {ElasticList} from "../components/ElasticList";
import {TextHeader} from "../components/TextHeader";
import {CheckoutBar} from "../components/CheckoutBar";
import {PlatformBottomSheet, PlatformBottomSheetItem} from "../components/PlatformBottomSheet";
import {PlatformToast} from "../components/PlatformToast";
import {CartRepository} from "../repository/CartRepository";
import {SummaryRepository} from "../repository/SummaryRepository";

export const CartScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [isPaymentSheetVisible, setPaymentSheetVisible] = useState(false);
    const [data, setData] = useState({});

    async function loadCart() {
        try {
            const cart = await CartRepository.get();
            setData(cart);
            await loadPaymentOptions();
        } catch (error) {
            console.error(error);
        } finally {
            try {
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
    }

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
            try {
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
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
            try {
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
    };

    async function finalize() {
        try {
            const products = (data as Cart)?.products;
            if (products === undefined || products.length <= 0) {
                PlatformToast.showError('You have no products to purchase!')
                return
            }

            await SummaryRepository.complete();
            setPaymentSheetVisible(true);
        } catch (error) {
            console.error(error);
        } finally {
            try {
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function postPayment(type: string) {
        try {
            setPaymentSheetVisible(false);
            setLoading(true);
            await SummaryRepository.payment(type);
            setLoading(false);
            navigation.replace('Orders');
        } catch (error) {
            console.error(error);
        } finally {
            try {
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
    }

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
            <TextHeader text={"Cart"}/>
            <StateWrapper isLoading={isLoading}>
                <ElasticList
                    data={(data as Cart)?.products ?? []}
                    renderItem={({item}) => (
                        <ProductItem
                            isCartProduct={true}
                            product={item}
                            onAction={() => {
                                setLoading(!isLoading);
                                removeProductFromCart(item.id);
                                PlatformToast.showSuccess('Added to cart');
                            }}
                        />)
                    }/>
                <CheckoutBar data={data as Cart} onFinalize={() => finalize()}/>
                <PlatformBottomSheet
                    isVisible={isPaymentSheetVisible}
                    onClose={() => setPaymentSheetVisible(false)}
                    items={paymentOptions.map((item) => PlatformBottomSheetItem.create({
                        name: item.type,
                        isAvailable: item.isAvailable
                    }))}
                    onItemPressed={index => {
                        postPayment(paymentOptions[index].type)
                    }}
                />
            </StateWrapper>
        </FullScreen>
    );
};
