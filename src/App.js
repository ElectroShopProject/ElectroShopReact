import React from 'react';
import Toast from 'react-native-toast-message';
import {LoginScreen} from '../presentation/screens/LoginScreen';
import {OrdersScreen} from '../presentation/screens/OrdersScreen';
import {ProductsScreen} from '../presentation/screens/ProductsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CartScreen} from '../presentation/screens/CartScreen';
import {Text, View} from 'react-native-web';

// const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View>
      <Text>Hello world</Text>
    </View>
    // <View>
    //   <NavigationContainer>
    //     <Stack.Navigator screenOptions={{headerShown: false}}>
    //       <Stack.Screen name="Login" component={LoginScreen} />
    //       <Stack.Screen name="Orders" component={OrdersScreen} />
    //       <Stack.Screen name="Products" component={ProductsScreen} />
    //       <Stack.Screen name="Cart" component={CartScreen} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    //   <Toast />
    // </View>
  );
};

export default App;
