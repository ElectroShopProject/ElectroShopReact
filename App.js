import React from 'react';
import type {Node} from 'react';
import Toast from 'react-native-toast-message';
import {LoginScreen} from './presentation/screens/LoginScreen';
import {OrdersScreen} from './presentation/screens/OrdersScreen';
import {ProductsScreen} from './presentation/screens/ProductsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CartScreen} from './presentation/screens/CartScreen';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen name="Products" component={ProductsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default App;
