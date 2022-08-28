import {StatusBar} from 'react-native';
import {BrandAppBar} from '../components/BrandAppBar';
import React, {useEffect, useState} from 'react';
import {OrderItem} from '../components/OrderItem';
import {ElasticList} from "../components/ElasticList";
import {TextHeader} from "../components/TextHeader";
import {StateWrapper} from "../components/StateWrapper";
import {FullScreen} from "../components/FullScreen";
import {PlatformActionButton} from "../components/PlatformActionButton";
import {CartRepository} from "../repository/CartRepository";
import {UserRepository} from "../repository/UserRepository";

export const OrdersScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]); // Array of orders

    async function getOrders() {
        try {
            const orders = await UserRepository.orders();
            // Make sure cart is ready to modifications
            await CartRepository.create();
            setData(orders);
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
        getOrders();
    }, data);

    return (
        <FullScreen>
            <StatusBar/>
            <BrandAppBar allowBack={false} showCart={true} navigation={navigation}/>
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
