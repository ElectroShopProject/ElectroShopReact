import {Platform, StyleSheet, ViewProps} from 'react-native';
import React from "react";
import {ButtonProps} from "@react-native-material/core/src/Button";
import {Button} from "@react-native-material/core";

interface PlatformActionButtonProps {
    buttonStyle?: ViewProps
}

export class PlatformActionButton extends React.Component<ButtonProps & PlatformActionButtonProps> {
    render() {
        return (
            <Button
                color={'white'}
                variant={'text'}
                title={this.props.title}
                onPress={this.props.onPress}
                style={[this.props.buttonStyle, styles.position]}
                contentContainerStyle={{backgroundColor: '#6200ea', borderRadius: 32, padding: 24}}
            />
        )
    }
}

const styles = StyleSheet.create({
    position: {
        position: 'absolute',
        margin: 32,
        bottom: 0,
        right: 0,
        ...Platform.select({
            web: {},
            default: {
                left: 0,
            }
        })
    }
});
