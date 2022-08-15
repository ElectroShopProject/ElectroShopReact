import {Platform, StyleSheet, TouchableHighlight, TouchableNativeFeedback, View, ViewProps} from 'react-native';
import React from "react";

export class PlatformTouchable extends React.Component<ViewProps> {
    render() {
        return (
            Platform.select({
                web: (<TouchableHighlight style={this.props.style}>{this.props.children}</TouchableHighlight>),
                default: (<TouchableNativeFeedback style={this.props.style}>{this.props.children}</TouchableNativeFeedback>)
            })
        )
    }
}
