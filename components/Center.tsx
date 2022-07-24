import {StyleSheet, Text, View} from 'react-native';

type Props = {
    children: JSX.Element,
};

export function Center(props: Props) {
    return (
        <View style={center.main}>
            {props.children}
        </View>
    );
}

const center = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    }
});
