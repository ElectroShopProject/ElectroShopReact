import {Platform, StyleSheet, View, ViewProps} from 'react-native';
import React from "react";
import {BottomSheet} from "react-native-btr";
import {Button} from "@react-native-material/core";
import {Spacing} from "./Spacing";
import {Data} from "dataclass";

export class PlatformBottomSheetItem extends Data {
    name: string;
    isAvailable: boolean;
}

interface PlatformBottomSheetProps {
    isVisible: boolean,
    items?: PlatformBottomSheetItem[],
    onClose: () => any,
    onItemPressed: (index: number) => any
}

export class PlatformBottomSheet extends React.Component<ViewProps & PlatformBottomSheetProps> {
    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                <BottomSheet
                    visible={this.props.isVisible}
                    onBackButtonPress={this.props.onClose}
                    onBackdropPress={this.props.onClose}
                    children={
                        <View style={styles.sheet}>{
                            (this.props.items ?? []).map((item, index) => {
                                return getButtonChild(item, index, () => this.props.onItemPressed(index));
                            })
                        }</View>
                    }/>
            </View>
        )
    }
}

function getButtonChild(item: PlatformBottomSheetItem, index: number, onPress: () => any) {
    return (
        <>
            <Button
                disabled={!item.isAvailable}
                variant={'outlined'}
                title={item.name}
                onPress={onPress}
            />
            <Spacing/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {},
    sheet: {
        padding: 32,
        backgroundColor: 'white',
        margin: Platform.select({
            web: 16,
            default: 0
        }),
        borderTopStartRadius: 16,
        borderTopEndRadius: 16,
        borderBottomStartRadius: Platform.select({
            web: 16,
            default: 0
        }),
        borderBottomEndRadius: Platform.select({
            web: 16,
            default: 0
        }),
        alignSelf: 'center',
        width: Platform.select({
            web: '50%',
            default: '100%',
        })
    }
});
