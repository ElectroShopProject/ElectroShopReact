import {StyleSheet, Text, View} from 'react-native';
import React, {ReactElement} from "react";

export class Center extends React.Component<any, any> {
    render() {
        console.log("render center")
        return (<View>{
                React.Children.map(
                    this.props.children,
                    (child: ReactElement) => React.cloneElement(child, {style: [child.props.style, styles.second]}, null)
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

    second: {
        height: 300,
    }
});
