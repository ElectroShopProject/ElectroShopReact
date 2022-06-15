import {Surface} from '@react-native-material/core';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const ProductItem = ({index}): Node => {
  return (
    <Surface
      elevation={4}
      category="large"
      style={{
        alignSelf: 'stretch',
        padding: 8,
      }}>
      <View style={styles.column}>
        <Text>{'Title ' + index}</Text>
        <View height={8} />
        <Text>{'Subtitle ' + index}</Text>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    alignSelf: 'stretch',
  },
});
