import React from 'react';
import {AppBar, Icon, IconButton} from '@react-native-material/core';
import {Image} from 'react-native';

export const BrandAppBar = (value: {
  allowBack: boolean,
  showCart: boolean,
  navigation: any,
}) => {
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
        value.allowBack ? (
          <IconButton
            icon={() => (
              <Icon
                name="arrow-left"
                size={24}
                onPress={() => value.navigation.pop()}
              />
            )}
          />
        ) : (
          <></>
        )
      }
      trailing={() =>
        value.showCart ? (
          <IconButton
            icon={() => <Icon name="cart" size={24} />}
            onPress={() => value.navigation.navigate('Cart')}
          />
        ) : (
          <></>
        )
      }
      centerTitle={true}
      style={{
        backgroundColor: '#FFFFFF',
      }}
    />
  );
};
