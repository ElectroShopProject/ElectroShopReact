import {Platform, StyleSheet, View} from 'react-native';

type Props = {
    children: JSX.Element | JSX.Element[],
};

export function PlatformConstraint(props: Props) {
    return (
        <View style={styles.main}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        ...Platform.select({
            web: {
                maxWidth: 1024,
            },
        }),
    },
});
