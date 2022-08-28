import {StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FullScreen} from "../components/FullScreen";
import {ElasticList} from "../components/ElasticList";
import {ProductItem} from "../components/ProductItem";
import {BrandAppBar} from "../components/BrandAppBar";
import {TextHeader} from "../components/TextHeader";
import {StateWrapper} from "../components/StateWrapper";
import {PlatformToast} from "../components/PlatformToast";
import {ProductRepository} from "../repository/ProductRepository";
import {CartRepository} from "../repository/CartRepository";

export const ProductsScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]); // Array of products

    async function getProducts() {
        try {
            const products = await ProductRepository.products();
            setData(products);
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

    async function addProductToCart(productId: string) {
        try {
            await CartRepository.addProduct(productId);
            PlatformToast.showSuccess('Added to cart');
        } catch (error) {
            console.error(error);
            PlatformToast.showError('Error! Product not added');
        } finally {
            try {
            setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
    }

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
                    renderItem={({item}) =>
                        (<ProductItem
                            isCartProduct={false}
                            product={item}
                            onAction={() => {
                                setLoading(!isLoading);
                                addProductToCart(item.id);
                            }}
                        />)
                    }
                />
            </StateWrapper>
        </FullScreen>
    );
};
