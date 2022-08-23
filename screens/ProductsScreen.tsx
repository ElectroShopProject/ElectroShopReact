import {StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FullScreen} from "../components/FullScreen";
import {ElasticList} from "../components/ElasticList";
import {ProductItem} from "../components/ProductItem";
import {Product} from "../data/models/Product";
import {Manufacturer} from "../data/models/Manufacturer";
import {BrandAppBar} from "../components/BrandAppBar";
import {TextHeader} from "../components/TextHeader";
import {StateWrapper} from "../components/StateWrapper";
import {PlatformToast} from "../components/PlatformToast";

export const ProductsScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]); // Array of products

    const getProducts = async () => {
        try {
            const response = await fetch(
                'https://electroshopapi.herokuapp.com/products',
            );
            const products = await response.json();
            setData(products);
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
        getProducts();
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
                                    PlatformToast.showSuccess('Added to cart');
                                }}
                            />
                        );
                    }}
                />
            </StateWrapper>
        </FullScreen>
    );
};
