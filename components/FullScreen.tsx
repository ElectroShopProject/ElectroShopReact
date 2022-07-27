import {Dimensions, StyleSheet, View, ViewProps} from 'react-native';
import React, {ReactElement} from "react";

export class FullScreen extends React.Component<ViewProps> {
    render() {
        return (
            <View style={[this.props.style, styles.main]}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
});
