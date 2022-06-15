import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {BrandAppBar} from '../components/BrandAppBar';
import {ProductItem} from '../components/ProductItem';
import {IconComponentProvider} from '@react-native-material/core';
import React from 'react';

export const ProductsScreen: () => Node = () => {
  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <SafeAreaView>
        <StatusBar />
        <BrandAppBar />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {Array.from({length: 20}, (x, i) => (
              <View
                style={{
                  marginHorizontal: 16,
                  marginVertical: 8,
                  alignSelf: 'stretch',
                }}>
                <ProductItem index={i} />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </IconComponentProvider>
  );
};
