import {View, ActivityIndicator} from 'react-native';

type Props = {
    isLoading: boolean,
    children: JSX.Element | JSX.Element[],
};

export function FullScreenLoadingContainer(props: Props) {
    return (
        <View>
            {
                props.isLoading ? (
                    <View style={{flex: 1, alignSelf: 'center', height: 600, backgroundColor: 'red'}}>
                        <ActivityIndicator size="large" color="black"/>
                    </View>
                ) : (
                    props.children
                )
            }
        </View>
    )
}