import {Platform, StyleSheet, Text, View} from 'react-native';

type Props = {
    children: JSX.Element,
};

export function PlatformWidth(props: Props) {
    return (
        <View style={center.main}>
            {props.children}
        </View>
    );
}

const center = StyleSheet.create({
    main: {
        flex: 1,
        ...Platform.select({
            web: {
                maxWidth: 1024,
            },
        }),
    }
});
