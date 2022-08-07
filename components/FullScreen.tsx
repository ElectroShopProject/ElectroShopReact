import {Dimensions, StyleSheet, useWindowDimensions, View, ViewProps} from 'react-native';
import React, {ReactElement, useState} from "react";

export function FullScreen(props: ViewProps) {
    const window = useWindowDimensions();
    return (
        <View style={[props.style, {height: window.height, width: window.width}]}>
            {props.children}
        </View>
    )
}
