import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LoginScreen} from "./screens/LoginScreen";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OrdersScreen} from "./screens/OrdersScreen";
import {ProductsScreen} from "./screens/ProductsScreen";
import Toast from "react-native-toast-message";
import {CartScreen} from "./screens/CartScreen";
import {IconComponentProvider} from "@react-native-material/core";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Center} from "./components/Center";
import {PlatformWidth} from "./components/PlatformWidth";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <>
            <NavigationContainer initialRouteName="Login">
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Orders" component={OrdersScreen}/>
                    <Stack.Screen name="Products" component={ProductsScreen}/>
                    <Stack.Screen name="Cart" component={CartScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
            <Toast/>
        </>
    );
}

export default function () {
    return (
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Center>
                <PlatformWidth>
                    <App/>
                </PlatformWidth>
            </Center>
        </IconComponentProvider>
    );
}
