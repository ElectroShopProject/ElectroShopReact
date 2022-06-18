import React from 'react';
import type {Node} from 'react';
import Toast from 'react-native-toast-message';
import {LoginScreen} from './presentation/screens/LoginScreen';

const App: () => Node = () => {
  return (
    <>
      <LoginScreen />
      <Toast />
    </>
  );
};

export default App;
