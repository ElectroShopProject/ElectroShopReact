import {Platform, ViewProps} from "react-native";
import React from "react";
import {Surface} from "@react-native-material/core";

export class PlatformSurface extends React.Component<ViewProps> {
    render() {
        return (
            <Surface
                category="large"
                style={this.props.style}
                elevation={Platform.select({web: 2, default: 4})}>
                {this.props.children}
            </Surface>
        )
    }
}