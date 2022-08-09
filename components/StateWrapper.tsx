import {ActivityIndicator, Dimensions, Text, useWindowDimensions, View, ViewProps} from 'react-native';
import React from "react";
import {Expand} from "./Expand";

export interface StateProps {
    isLoading: boolean
}

export class StateWrapper extends React.Component<StateProps & ViewProps> {
    render() {
        return (
            this.props.isLoading ? (
                <View style={{
                    width: Math.min(Dimensions.get("window").width, 1024),
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