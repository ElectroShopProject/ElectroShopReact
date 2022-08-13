import React from "react";
import {StyleSheet, View, ViewProps} from "react-native";
import {Text} from '@react-native-material/core';

interface TextHeaderProps {
    text: string
}

export class TextHeader extends React.Component<ViewProps & TextHeaderProps> {
    render() {
        return (
            <View style={[this.props.style, styles.main]}>
                <Text variant={'h4'}>{this.props.text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        padding: 64,
        backgroundColor: '#DDDDDD',
        alignItems: 'center'
    },
});