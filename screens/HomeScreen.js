import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation, route }) {
    const { name } = route.params;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!</Text>
        <Text>This is {JSON.stringify(name)}'s home page.</Text>
      </View>
    );
  }