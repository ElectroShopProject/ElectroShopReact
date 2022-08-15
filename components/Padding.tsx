import {Platform, StyleSheet, View, ViewProps} from 'react-native';
import React from "react";

interface PaddingProps {
    size?: number | undefined
}

export class Padding extends React.Component<ViewProps & PaddingProps> {
    render() {
        return (
            <View style={[this.props.style, this.props.size ? {padding: this.props.size} : styles.main]}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        padding: Platform.select({
            web: 16,
            native: 8,
            default: 16
        })
    },
});
