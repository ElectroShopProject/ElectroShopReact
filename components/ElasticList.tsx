import {FlatList, FlatListProps, StyleSheet, useWindowDimensions, View, Text, ListRenderItemInfo} from 'react-native';
import React from "react";
import {ScreenDimensions} from "../ScreenDimensions";

export function ElasticList<ItemT = any>(props: FlatListProps<ItemT>) {
    const window = useWindowDimensions();
    const columnNum = getNumberOfColumns(window.width);

    return (
        <FlatList
            key={columnNum.toString()}
            style={[props.style, styles.main]}
            data={props.data}
            keyExtractor={(_, index) => index.toString()}
            numColumns={columnNum}
            renderItem={(info: ListRenderItemInfo<ItemT>) => (
                <View style={{flex: 1 / columnNum}}>
                    {props.renderItem.call(this, info)}
                </View>)
            }/>
    );

    function getNumberOfColumns(width: number): number {
        if (width <= ScreenDimensions.small) {
            return 1;
        }

        if (width <= ScreenDimensions.medium) {
            return 2;
        }

        if (width <= ScreenDimensions.big) {
            return 3;
        }

        return 4;
    }
}

const styles = StyleSheet.create({
    main: {
        flexGrow: 0,
    },
});
