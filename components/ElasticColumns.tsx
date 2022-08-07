import {Dimensions, Platform, StyleSheet, useWindowDimensions, View, ViewProps} from 'react-native';
import React from "react";
import {Expand} from "./Expand";
import {SpacedColumn} from "./SpacedColumn";
import {Padding} from "./Padding";
import {Center} from "./Center";

export function ElasticColumns(props: ViewProps) {
    const window = useWindowDimensions();
    const childCount = React.Children.count(props.children)
    const leftColumnChildren = React.Children.toArray(props.children).slice(0, childCount / 2)
    const rightColumnChildren = React.Children.toArray(props.children).slice(childCount / 2, childCount)
    return (
        <View style={[props.style, styles.main]}>{
            window.width >= 768 ? (
                <View style={styles.sideView}>
                    <Expand>
                        <Center>
                            <View style={styles.halfSize}>
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
                        <Center>
                            <View style={styles.halfSize}>
                                <Expand>
                                    <SpacedColumn>
                                        {rightColumnChildren}
                                    </SpacedColumn>
                                </Expand>
                            </View>
                        </Center>
                    </Expand>
                </View>
            ) : (
                <Expand>
                    <SpacedColumn>
                        {props.children}
                    </SpacedColumn>
                </Expand>
            )
        }
        </View>
    )
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
    halfSize: {
        flex: 0.5
    },
});
