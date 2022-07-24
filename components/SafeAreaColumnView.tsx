import {SafeAreaView, StyleSheet, View} from 'react-native';

type Props = {
    children: JSX.Element,
};

export function SafeAreaColumnView(props: Props) {
    return (
        <SafeAreaView style={styles.main}>
            {props.children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    }
});