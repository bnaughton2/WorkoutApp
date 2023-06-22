import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function StartWorkoutScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>StartWorkout!</Text>
      </View>
    );
  }