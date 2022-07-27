import {StyleSheet, View, ViewProps} from 'react-native';
import React, {ReactElement} from "react";

export class Column extends React.Component<ViewProps> {
    render() {
        const {style, children} = this.props;
        return (
            <View style={[style, styles.main]}>{
                React.Children.map(children, (child: ReactElement) => {
                    return React.cloneElement(child, {style: [child.props.style]}, null);
                })
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'red'
    },
});
