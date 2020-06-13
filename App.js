import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './components/Login';
import AboutScreen from './components/AboutScreen';
import TiendasScreen from './components/Tiendas';


class HomeScreen extends React.Component {
render() {
return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text>Home Screen</Text>
</View>
);
}
}

 const AppNavigator = createStackNavigator({
 Home: {
 screen: LoginScreen
 },
 Bienvenida: {
 screen: AboutScreen
 },
 Tiendas: {
     screen: TiendasScreen
 }
 });

 export default createAppContainer(AppNavigator);