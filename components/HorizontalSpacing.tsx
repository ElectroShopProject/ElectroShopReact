import {Platform, StyleSheet, View, ViewProps} from 'react-native';
import React from "react";

interface SpacingProps {
    size?: number | undefined
}

export class HorizontalSpacing extends React.Component<ViewProps & SpacingProps> {
    render() {
        return (
            <View style={this.props.size ? {width: this.props.size} : styles.main}/>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        width: Platform.select({
            web: 16,
            default: 8
        })
    },
});
