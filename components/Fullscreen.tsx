import {Dimensions, StyleSheet, View} from 'react-native';
import React from "react";

type Props = {
    children: JSX.Element,
};

// export class Fullscreen extends React.Component<any, any> {
//     render() {
//         const {styles, children} = this.props;
//         return (
//             <View style={styles.main}>
//                 {React.Children.map(children, child => {
//                     console.log(child);
//                     return React.cloneElement(child, styles.second, null);
//                 })}
//             </View>
//         )
//     }
// }

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'red'
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
    },

    second: {
        backgroundColor: 'green'
    }
});
