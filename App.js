import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BalanceScreen from './paginas/BalanceScreen';
import ConfigurationScreen from './paginas/ConfigurationScreen';
import HomeScreen from './paginas/HomeScreen';
import LoginScreen from './paginas/LoginScreen';
import TradeScreen from './paginas/TradeScreen';
import TransactionsScreen from './paginas/Transactions';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Balance' component={BalanceScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Configuration' component={ConfigurationScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Trade' component={TradeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Transactions' component={TransactionsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
