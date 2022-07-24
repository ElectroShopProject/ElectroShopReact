import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {Center} from "./Center";

type Props = {
    isLoading: boolean,
    children: JSX.Element,
};

export function FullScreenLoadingContainer(props: Props) {
    return (
        <Center>
            {
                props.isLoading ? (
                    <ActivityIndicator size="large" color="black"/>
                ) : (
                    <View>
                        {props.children}
                    </View>
                )
            }
        </Center>
    )
}