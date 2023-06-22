import * as React from 'react';
import { Text, View, Button } from 'react-native';

export default function SettingScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }