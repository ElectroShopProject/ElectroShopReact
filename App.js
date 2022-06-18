import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {ProductsScreen} from './presentation/screens/ProductsScreen';
import Toast from 'react-native-toast-message';

const App: () => Node = () => {
  return (
    <>
      <ProductsScreen />
      <Toast />
    </>
  );
};

export default App;
