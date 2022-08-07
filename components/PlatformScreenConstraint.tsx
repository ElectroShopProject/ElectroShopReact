import {Platform, StyleSheet, View, ViewProps} from 'react-native';
import React from "react";

export class PlatformScreenConstraint extends React.Component<ViewProps> {
    render() {
        return (
            <View style={[this.props.style, styles.main]}>{this.props.children}</View>
        )
    }
}

const styles = StyleSheet.create({
    main: Platform.select({
        web: {
            maxWidth: 1024,
        },
    })
});
