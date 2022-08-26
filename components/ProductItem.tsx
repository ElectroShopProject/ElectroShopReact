import React from 'react';
import {Product} from '../data/models/Product';
import {Expand} from "./Expand";
import {Platform, StyleSheet, Text, View} from "react-native";
import {Padding} from "./Padding";
import TextStyle from "../styles/TextStyle";
import {HStack, Icon, IconButton, Spacer, Surface, VStack} from "@react-native-material/core";
import {PlatformTouchable} from "./PlatformTouchable";
import {Spacing} from "./Spacing";
import {Divider} from "./Divider";
import {HorizontalSpacing} from "./HorizontalSpacing";
import {PlatformSurface} from "./PlatformSurface";

export function ProductItem(value: {
    product: Product;
    onAction: Function;
    isCartProduct: boolean;
}) {
    return (
        <Padding>
            <PlatformTouchable>
                <PlatformSurface>
                    <Padding>
                        <HStack items={'center'}>
                            <Expand style={styles.container}>
                                <Text numberOfLines={Platform.OS === 'web' ? 1 : 2} style={TextStyle.title}>
                                    {value.product.name}
                                </Text>
                                <Spacing/>
                                <Text style={TextStyle.bold}>
                                    {value.product.manufacturer.name}
                                </Text>
                                <Spacing/>
                                <Divider inset={32}/>
                                <Spacing/>
                                <HStack items={'baseline'}>
                                    <Text>{value.product.category}</Text>
                                    <Spacer/>
                                    <Text style={TextStyle.sidePrice}>
                                        {value.product.netPrice.toFixed(2)}
                                    </Text>
                                    <HorizontalSpacing/>
                                    <Text style={TextStyle.mainPrice}>
                                        {value.product.grossPrice.toFixed(2)}
                                    </Text>
                                </HStack>
                            </Expand>
                            <IconButton
                                style={styles.cartIcon}
                                onPress={() => value.onAction()}
                                icon={getCardActionIcon(value.isCartProduct)}/>
                        </HStack>
                    </Padding>
                </PlatformSurface>
            </PlatformTouchable>
        </Padding>
    );

    function getCardActionIcon(isCartProduct: boolean) {
        return isCartProduct ? (
            <Icon name="delete" size={24}/>
        ) : (
            <Icon name="cart-plus" size={24}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Platform.select({
            web: 0,
            default: 8
        })
    },
    cartIcon: {
        margin: 8
    }
});

