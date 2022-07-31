import {Platform, StyleSheet, View, ViewProps} from 'react-native';
import React from "react";
import {Expand} from "./Expand";
import {SpacedColumn} from "./SpacedColumn";
import {Padding} from "./Padding";

export class PlatformSideView extends React.Component<ViewProps> {
    render() {
        const childCount = React.Children.count(this.props.children)
        const leftColumnChildren = React.Children.toArray(this.props.children).slice(0, childCount / 2)
        const rightColumnChildren = React.Children.toArray(this.props.children).slice(childCount / 2, childCount)
        return <View style={[this.props.style, styles.main]}>{
            Platform.OS === 'web' ? (
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Expand>
                        <View style={{justifyContent: 'space-evenly'}}>
                            {leftColumnChildren}
                        </View>
                    </Expand>
                    <View style={{width: 1, backgroundColor: '#EEE', margin: 16}}/>
                    <Expand>
                        <View style={{justifyContent: 'space-evenly'}}>
                            {rightColumnChildren}
                        </View>
                    </Expand>
                </View>
            ) : (
                this.props.children
            )
        }
        </View>
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
});
