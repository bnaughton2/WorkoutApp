import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function MoreScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>More!</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home', {name: 'Bobby'})} />
      </View>
    );
  }