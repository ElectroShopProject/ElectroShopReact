import {Flex, Text} from '@react-native-material/core';
import React from 'react';
import {Product} from '../data/models/Product';
import {Order} from '../data/models/Order';
import {Spacing} from "./Spacing";
import {Divider} from "./Divider";
import {Padding} from "./Padding";
import {PlatformSurface} from "./PlatformSurface";
import TextStyle from "../styles/TextStyle";
import {Expand} from "./Expand";

export const OrderItem = (props: { order: Order }) => {

    return (
        <Padding>
            <PlatformSurface>
                <Padding>
                    <Expand>
                        <Text style={TextStyle.title}>{"Products: "}</Text>
                        {getProductItems(
                            props.order.products,
                            getCountedProducts(props.order.products),
                        )}
                        <Spacing/>
                        <Divider inset={32}/>
                        <Spacing/>
                        <Text style={[TextStyle.mainPrice, {textAlign: 'right'}]}>
                            {props.order.payment?.amount ?? 0.00}
                        </Text>
                    </Expand>
                </Padding>
            </PlatformSurface>
        </Padding>
    );

    function getCountedProducts(products: Product[]) {
        let countedProducts = new Map<string, number>();
        let uniqueProductIds = [
            ...new Set(products.map((product: Product) => product.id)),
        ];

        uniqueProductIds.forEach((uniqueProductId: string) => {
            countedProducts.set(
                uniqueProductId,
                products.filter((product: Product) => product.id === uniqueProductId)
                    .length,
            );
        });

        return countedProducts;
    }

    function getProductItems(products: Product[], map: Map<string, number>) {
        return Array.from(map).map(([key, count]) => {
            let foundProduct = products.find(
                (product: Product) => product.id === key,
            );
            return <Text style={TextStyle.product}>
                {'Product ' + count + 'x ' + foundProduct.name}
            </Text>;
        });
    }
};