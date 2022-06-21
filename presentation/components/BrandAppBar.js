import React from 'react';
import {AppBar, Icon, IconButton} from '@react-native-material/core';
import {Image, Text} from 'react-native';
import {Product} from '../../data/models/Product';

export const BrandAppBar: (value: {
  navigation: any,
}) => Node = (value: {navigation: any}) => {
  return (
    <AppBar
      title={
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            flex: 1,
            aspectRatio: 1.8,
            resizeMode: 'contain',
          }}
        />
      }
      enableColorOnDark={true}
      leading={() =>
        value.navigation === undefined ? (
          <></>
        ) : (
          <IconButton
            icon={() => (
              <Icon
                name="arrow-left"
                size={24}
                onPress={() => value.navigation.pop()}
              />
            )}
          />
        )
      }
      trailing={() => (
        <IconButton icon={() => <Icon name="cart" size={24} />} />
      )}
      centerTitle={true}
      style={{
        backgroundColor: '#FFFFFF',
      }}
    />
  );
};
