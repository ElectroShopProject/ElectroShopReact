import {Dimensions, Platform, StyleSheet, View, ViewProps} from 'react-native';
import React from "react";
import {Expand} from "./Expand";
import {SpacedColumn} from "./SpacedColumn";
import {Padding} from "./Padding";
import {Center} from "./Center";

export class SideView extends React.Component<ViewProps> {
    render() {
        const childCount = React.Children.count(this.props.children)
        const leftColumnChildren = React.Children.toArray(this.props.children).slice(0, childCount / 2)
        const rightColumnChildren = React.Children.toArray(this.props.children).slice(childCount / 2, childCount)
        return <View style={[this.props.style, styles.main]}>{
            Dimensions.get('window').width >= 768 ? (
                <View style={styles.sideView}>
                    <Expand>
                        <Center>
                            <View style={styles.shrink}>
                                <Expand>
                                    <SpacedColumn>
                                        {leftColumnChildren}
                                    </SpacedColumn>
                                </Expand>
                            </View>
                        </Center>
                    </Expand>
                    <View style={styles.divider}/>
                    <Expand>
                        <Expand>
                            <Center>
                                <View style={styles.shrink}>
                                    <Expand>
                                        <SpacedColumn>
                                            {rightColumnChildren}
                                        </SpacedColumn>
                                    </Expand>
                                </View>
                            </Center>
                        </Expand>
                    </Expand>
                </View>
            ) : (
                <Expand>
                    <SpacedColumn>
                        {this.props.children}
                    </SpacedColumn>
                </Expand>
            )
        }
        </View>
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    sideView: {
        flex: 1,
        flexDirection: 'row'
    },
    divider: {
        width: 1,
        backgroundColor: '#EEE',
        margin: 16
    },
    shrink: {
        flex: 0.5
    },
});
