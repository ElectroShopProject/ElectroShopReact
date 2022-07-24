import {StyleSheet, View} from 'react-native';
import React from "react";

type Props = {
    children: JSX.Element,
};

export function Center(props: Props) {
    return (
        <View style={styles.main}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
    },
});
