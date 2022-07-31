import {StyleSheet, View, ViewProps} from 'react-native';
import React from "react";

export class CardBackground extends React.Component<ViewProps> {
    render() {
        return (
            <View style={[this.props.style, styles.main]}>{this.props.children}</View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        borderRadius: 32,
    },
});
