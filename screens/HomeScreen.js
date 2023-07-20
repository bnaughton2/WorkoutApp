import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SQLite from "expo-sqlite";
import { init } from '../sqlite.js'


export default function HomeScreen({ navigation, route }) {
    const { name } = route.params;
    const [items, setItems] = useState([]);
    const db = SQLite.openDatabase("workout.db");

    // db.transaction(tx => {
    //   tx.executeSql(
    //     "select * from users",
    //     [],
    //     (_, { rows: { _array } }) => setItems(_array),
    //     () => console.log("error fetching")
    //   );
    // });
    
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!</Text>
        <Text>This is {name}'s home page.</Text>
        {/* <Text>User's List: {items[0].username}</Text> */}
      </View>
    );
  }