import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SQLite from "expo-sqlite";
import { init } from '../sqlite.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen({ navigation, route }) {
    const [items, setItems] = useState([]);
    const [userID, setUserID] = useState(0);
    const [firstName, setFirstName] = useState('');
    const db = SQLite.openDatabase("workout.db");

    useEffect(() => {

      AsyncStorage.getItem('userID', (err, result) => {
        setUserID(JSON.parse(result));
      });
      AsyncStorage.getItem('firstName', (err, result) => {
        setFirstName(JSON.parse(result));
      });
      }, [userID, firstName]);

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
        {/* <Text>This is {firstName}'s home page.</Text> */}
        {/* <Text>User's List: {items[0].username}</Text> */}
      </View>
    );
  }