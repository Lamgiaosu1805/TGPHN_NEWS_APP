import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import CathCalendarScreen from '../screens/CathCalendarScreen';
import CatechismScreen from '../screens/CatechismScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const TabBarIcon = ({ icon, label, focused }) => {
  return (
    <View style={styles.tabItem}>
      <FontAwesome5
        name={icon}
        size={18}
        color={focused ? '#e53935' : '#999'}
        style={{ marginBottom: 2 }}
      />
      <Text
        style={[
          styles.label,
          {
            color: focused ? '#e53935' : '#999',
            fontWeight: focused ? '600' : 'normal',
          },
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        minimumFontScale={0.8}
      >
        {label}
      </Text>
    </View>
  );
};

export default function HomeBottomTabSwipeNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialLayout={{ width: Dimensions.get('window').width }}
      swipeEnabled={true}
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: Platform.OS === 'android' ? 75 + insets.bottom / 2 : 75,
          borderTopWidth: 0.3,
          borderTopColor: '#ccc',
          elevation: 4,
        },
        tabBarIndicatorStyle: {
          height: 0,
        },
        // Giảm độ nhạy của swipe
        swipeVelocityImpact: 0.4, // mặc định là 0.5
        swipeDistanceThreshold: 100, // tăng từ mặc định (60) lên để swipe dài hơn mới chuyển
      }}
    >
      <Tab.Screen
        name="TrangChu"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="home" label="Trang chủ" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="GiaoLy"
        component={CatechismScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="book-open" label="Giáo lý" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="CathCalendar"
        component={CathCalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="calendar" label="Lịch công giáo" focused={focused} />
          ),
          gestureHandlerProps: {
            activeOffsetX: [-30, 30], // Phải vuốt mạnh hơn mới được chuyển tab
          },
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="bars" label="Mở rộng" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    paddingBottom: 4,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    maxWidth: 80,
  },
});
