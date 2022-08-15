import {Platform, StyleSheet, View, ViewProps} from 'react-native';
import React from "react";

interface DividerProps {
    height?: number | undefined
    inset?: number | undefined
}

export class Divider extends React.Component<ViewProps & DividerProps> {
    render() {
        return (
            <View style={{paddingHorizontal: this.props.inset ?? 0}}>
                <View style={{
                    backgroundColor: '#EEEEEE',
                    height: this.props.height ?? 1,
                }}/>
            </View>
        )
    }
}
