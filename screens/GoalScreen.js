import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function GoalScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Goals!</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home', {name: 'Bob'})} />
      </View>
    );
  }