import {StatusBar} from 'react-native';
import {BrandAppBar} from '../components/BrandAppBar';
import React, {useEffect, useState} from 'react';
import {OrderItem} from '../components/OrderItem';
import {ElasticList} from "../components/ElasticList";
import {TextHeader} from "../components/TextHeader";
import {StateWrapper} from "../components/StateWrapper";
import {FullScreen} from "../components/FullScreen";
import {PlatformActionButton} from "../components/PlatformActionButton";

export const OrdersScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]); // Array of products

    const createCart = async () => {
        try {
            const response = await fetch(
                'https://electroshopapi.herokuapp.com/cart',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({userId: global.userId}),
                },
            );
            const cart = await response.json();
            global.cartId = cart.id;
            console.log(global.cartId);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getOrders = async () => {
        try {
            const response = await fetch(
                'https://electroshopapi.herokuapp.com/user/orders?userId=' +
                global.userId,
            );
            const json = await response.json();
            setData(json);
            console.log(json);
            await createCart();
            return json;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <FullScreen>
            <StatusBar/>
            <BrandAppBar allowBack={true} showCart={true} navigation={navigation}/>
            <StateWrapper isLoading={isLoading}>
                <TextHeader text={'Orders'}/>
                <ElasticList
                    data={data}
                    renderItem={({item}) => <OrderItem order={item}/>}/>
                <PlatformActionButton
                    title={'Create new order'}
                    onPress={() => navigation.navigate('Products')}/>
            </StateWrapper>
        </FullScreen>
    );
};
