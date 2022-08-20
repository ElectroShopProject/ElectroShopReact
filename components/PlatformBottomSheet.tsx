import {StyleSheet, View, ViewProps} from 'react-native';
import React, {useState} from "react";
import {BottomSheet} from "react-native-btr";
import {Button, Divider} from "@react-native-material/core";

interface PlatformBottomSheetProps {
    shouldShow: boolean,
    onItemPressed: (index: number) => any
}

export function PlatformBottomSheet(props: ViewProps & PlatformBottomSheetProps) {
    const [visible, setVisible] = useState(props.shouldShow);

    return (
        <View style={[this.props.style, styles.main]}>
            <BottomSheet
                visible={visible}
                //setting the visibility state of the bottom shee
                onBackButtonPress={() => setVisible(!visible)}
                //Toggling the visibility state on the click of the back botton
                onBackdropPress={() => setVisible(!visible)}
                //Toggling the visibility state on the clicking out side of the sheet
                children={
                    // TODO Extract bottom sheet as a component
                    <View style={{width: '100%', backgroundColor: 'white', padding: 24}}>
                        // TODO Handle options from backend
                        <Button
                            variant={'outlined'}
                            title={'Credit card'}
                            onPress={() => this.props.onItemPressed(0)}
                        />
                        <View style={{height: 8}}/>
                        <Button
                            variant={'outlined'}
                            title={'Bank transfer'}
                            onPress={() => this.props.onItemPressed(1)}
                        />
                        <Divider inset={32}/>
                        <Button
                            variant={'outlined'}
                            title={'PayPal'}
                            onPress={() => this.props.onItemPressed(2)}
                        />
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
});
