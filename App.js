import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeBottomTabNavigator from './src/navigators/HomeBottomTabNavigator';
import { StatusBar } from 'expo-status-bar';
import LMScreen from './src/screens/LMScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  
  return(
    <NavigationContainer>
      <StatusBar translucent style='auto'/>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='HomeBottomTabNavigator'>
        <Stack.Screen name="HomeBottomTabNavigator" component={HomeBottomTabNavigator} />
        <Stack.Screen name="LMScreen" component={LMScreen} />
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LinhMucScreen" component={LinhMucScreen} />
        <Stack.Screen name="GiaoXuScreen" component={GiaoXuScreen} /> */}
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