import React from 'react';
import {Image} from 'react-native';
import {AppBar} from '@react-native-material/core';

export const BrandAppBar = () => {
  return (
    <AppBar
      leading={[
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            width: 100,
            alignContent: 'center',
          }}
          resizeMethod={'scale'}
        />,
      ]}
      centerTitle={true}
      style={{
        backgroundColor: '#FFFFFF',
      }}
    />
  );
};
