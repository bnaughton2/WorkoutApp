import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingScreen from './screens/SettingScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import HistoryScreen from './screens/HistoryScreen.js';
import GoalScreen from './screens/GoalScreen.js';
import MoreScreen from './screens/MoreScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import SignUp from './screens/SignUp.js';
import Login from './screens/Login.js';
import StartWorkoutScreen from './screens/StartWorkoutScreen.js';
import { StatusBar } from 'expo-status-bar';
import { init } from './sqlite.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();
let db;
init().then(o => db=o);

function LowerTabs(){
  const [userID, setUserID] = useState(0);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {

    AsyncStorage.getItem('userID', (err, result) => {
      setUserID(JSON.parse(result));
    });
    AsyncStorage.getItem('firstName', (err, result) => {
      setFirstName(JSON.parse(result));
    });
    }, [userID, firstName]);

  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Start Workout') {
            iconName = focused ? 'play' : 'play-outline';
          } else if (route.name === 'Goals') {
            iconName = focused ? 'md-medal' : 'md-medal-outline';
          } else if (route.name === 'More') {
            iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#F4F5FB',
        tabBarInactiveTintColor: '#F4F5FB',
        tabBarLabelStyle: {
          color: '#F4F5FB'
        },
        tabBarStyle :{
          backgroundColor: '#08125d'
        },
        headerStyle: {
          backgroundColor: '#08125d',
        },
        headerTitleStyle: {
          color: '#F4F5FB'
        }
      })}>
        <Tab.Screen name="Home" component={HomeScreen} options={{title: 'Hi '+firstName+'!'}}/>
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Start Workout" component={StartWorkoutScreen} />
        <Tab.Screen name="Goals" component={GoalScreen} />
        <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}


export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer >
      <StatusBar style="light"/>
      <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#08125d',
          shadowColor: 'transparent',
        },
        headerTitleStyle: {
          color: '#08125d'
        },
        headerBackTitleStyle:{
          color: '#F4F5FB'
        },
      }}
      >
        <Stack.Screen
          name="Tabs"
          component={LowerTabs}
          options={{ 
            headerShown: false,
            gestureEnabled: false }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false }}/>

      </Stack.Navigator>
      
    </NavigationContainer>
  );
}