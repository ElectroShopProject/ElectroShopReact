import {Platform, StyleSheet, Text, View, ViewProps} from 'react-native';
import {CardBackground} from "./CardBackground";
import {Expand} from "./Expand";
import {PlatformScreenConstraint} from "./PlatformScreenConstraint";
import React from "react";

export class PlatformBackground extends React.Component<ViewProps> {
    render() {
        return (
            <Expand style={styles.main}>{
                Platform.OS === 'web' ? (
                    <PlatformScreenConstraint>
                        <Expand>
                            <CardBackground>
                                {this.props.children}
                            </CardBackground>
                        </Expand>
                    </PlatformScreenConstraint>
                ) : (
                    this.props.children
                )
            }
            </Expand>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        ...Platform.select({
            android: {
                backgroundColor: 'white',
            },
            web: {
                alignSelf: 'center',
                margin: 32,
            },
        }),
    },
});
