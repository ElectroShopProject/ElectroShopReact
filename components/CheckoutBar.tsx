import React from "react";
import {StyleSheet, View, ViewProps} from "react-native";
import {Button, Text} from "@react-native-material/core";
import {Cart} from "../data/models/Cart";
import {Spacing} from "./Spacing";
import {Divider} from "./Divider";
import TextStyle from "../styles/TextStyle";
import {Product} from "../data/models/Product";

interface CheckoutBarProps {
    data: Cart,
    onFinalize: any // Function
}

export class CheckoutBar extends React.Component<ViewProps & CheckoutBarProps> {
    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                <View style={styles.priceRow}>
                    <Text style={TextStyle.title}>Total:</Text>
                    <Text style={TextStyle.title}>{getTotal(this.props.data.products)}</Text>
                </View>
                <Spacing/>
                <Divider inset={32}/>
                <Spacing/>
                <Button title={'Finalize order'} onPress={() => this.props.onFinalize()}/>
            </View>
        )
    }
}

function getTotal(products: Product[]) {
    const thisProducts = products ?? [];
    return (
        thisProducts.reduce(
            (sum, product) => sum + product.grossPrice, 0
        ) ?? 0.0
    ).toFixed(2)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});