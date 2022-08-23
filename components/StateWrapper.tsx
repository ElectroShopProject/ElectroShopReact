import {ActivityIndicator, Dimensions, Text, useWindowDimensions, View, ViewProps} from 'react-native';
import React from "react";
import {Expand} from "./Expand";

export interface StateProps {
    maxWidth?: number,
    isLoading: boolean
}

export class StateWrapper extends React.Component<StateProps & ViewProps> {
    render() {
        let windowWidth = Dimensions.get("window").width
        return (
            this.props.isLoading ? (
                <View style={{
                    width: this.props.maxWidth ? Math.min(this.props.maxWidth, windowWidth) : windowWidth,
                    height: Dimensions.get("window").height,
                    justifyContent: "center"
                }}>
                    <ActivityIndicator size="large" color="black"/>
                </View>
            ) : (
                this.props.children
            )
        )
    }
}