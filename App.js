import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeBottomTabNavigator from './src/navigators/HomeBottomTabNavigator';
import { StatusBar } from 'expo-status-bar';
import LMScreen from './src/screens/LMScreen';
import GiaoHatScreen from './src/screens/GiaoHatScreen';
import GiaoXuScreen from './src/screens/GiaoXuScreen';
import GXDetailScreen from './src/screens/GXDetailScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  
  return(
    <NavigationContainer>
      <StatusBar translucent style='auto'/>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='HomeBottomTabNavigator'>
        <Stack.Screen name="HomeBottomTabNavigator" component={HomeBottomTabNavigator} />
        <Stack.Screen name="LMScreen" component={LMScreen} />
        <Stack.Screen name="GiaoHatScreen" component={GiaoHatScreen} />
        <Stack.Screen name="GiaoXuScreen" component={GiaoXuScreen} />
        <Stack.Screen name="GXDetailScreen" component={GXDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: -100
  },
});