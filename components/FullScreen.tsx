import {SafeAreaView, useWindowDimensions, ViewProps} from 'react-native';
import React from "react";

export function FullScreen(props: ViewProps) {
    const window = useWindowDimensions();
    return (
        <SafeAreaView style={[props.style, {height: window.height, width: window.width}]}>
            {props.children}
        </SafeAreaView>
    )
}
