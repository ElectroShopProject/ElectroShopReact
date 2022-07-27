import {StyleSheet, View, ViewProps} from 'react-native';
import React, {ReactElement} from "react";

export class Center extends React.Component<ViewProps> {
    render() {
        return (
            <View style={styles.main}>{this.props.children}</View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
