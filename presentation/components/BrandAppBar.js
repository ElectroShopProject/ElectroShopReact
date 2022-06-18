import React from 'react';
import {AppBar, Icon, IconButton} from '@react-native-material/core';
import {Image, Text} from 'react-native';

export const BrandAppBar = () => {
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
      leading={() => (
        <IconButton icon={() => <Icon name="arrow-left" size={24} />} />
      )}
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
