import {Dimensions, StyleSheet, View, ViewProps} from 'react-native';
import React, {ReactElement} from "react";
import {Center} from "./Center";

export class SpacedColumn extends React.Component<ViewProps> {
    render() {
        return (
            <View style={[this.props.style, styles.main]}>{
                this.props.children
                // React.Children.map(
                //     this.props.children,
                //     (child: ReactElement) => <View style={{
                //         height: Dimensions.get('window').height / React.Children.count(this.props.children)
                //     }}><Center>{child}</Center></View>
                // )
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({main: {justifyContent: 'space-around'}})
