import {Platform, StyleSheet, View, ViewProps} from 'react-native';
import React from "react";
import {BottomSheet} from "react-native-btr";
import {Button} from "@react-native-material/core";
import {Spacing} from "./Spacing";

interface PlatformBottomSheetProps {
    isVisible: boolean,
    items?: string[],
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
                            (this.props.items ?? []).map((value, index) => {
                                return getButtonChild(value, index);
                            })
                        }</View>
                    }/>
            </View>
        )
    }
}

function getButtonChild(value: String, index: number) {
    return (
        <>
            <Button
                variant={'outlined'}
                title={value}
                onPress={() => this.props.onItemPressed(index)}
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
