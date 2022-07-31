import {Dimensions, StyleSheet, View, ViewProps} from 'react-native';
import React, {ReactElement} from "react";
import {Center} from "./Center";

export class SpacedColumn extends React.Component<ViewProps> {
    render() {
        return (
            <View style={[this.props.style, styles.main]}>{this.props.children}</View>
        )
    }
}

const styles = StyleSheet.create({main: {justifyContent: 'space-evenly'}})
