import {StyleSheet, View, ViewProps} from 'react-native';
import React, {ReactElement} from "react";

export class Expand extends React.Component<ViewProps> {
    render() {
        return (
            <View style={[this.props.style, styles.main]}>{
                React.Children.map(
                    this.props.children,
                    (child: ReactElement) => React.cloneElement(
                        child,
                        {style: [child.props.style, styles.main]},
                        child.props.children
                    )
                )
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({main: {flex: 1}});
