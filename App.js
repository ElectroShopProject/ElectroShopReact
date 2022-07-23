import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {LoginScreen} from "./screens/LoginScreen";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OrdersScreen} from "./screens/OrdersScreen";
import {ProductsScreen} from "./screens/ProductsScreen";
import Toast from "react-native-toast-message";
import {CartScreen} from "./screens/CartScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <>
        <NavigationContainer initialRouteName="Login">
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
