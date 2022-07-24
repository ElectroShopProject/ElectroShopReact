import {Dimensions, StyleSheet, View} from 'react-native';
import React from "react";

type Props = {
    children: JSX.Element,
};

export function Fullscreen(props: Props) {
    return (
        <View style={styles.main}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
});
