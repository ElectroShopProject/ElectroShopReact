import {StyleSheet, View, ViewProps} from 'react-native';
import React, {ReactElement} from "react";

export class Center extends React.Component<ViewProps> {
    render() {
        return (
            <View style={{flexDirection: 'column', height: 600, backgroundColor: 'red'}}>{
                React.Children.map(
                    this.props.children,
                    (child: ReactElement) => React.cloneElement(child, {style: [child.props.style, styles.main]}, null)
                )
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        justifyContent: 'center'
    },
});
