import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import { Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SQLite from "expo-sqlite";
import { init } from '../sqlite.js'


export default function ProfileScreen({ navigation, route }) {
    const db = SQLite.openDatabase("workout.db");
    const [flag, setFlag] = useState(0);
    const [user, setUser] = useState(null)

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
              "select * from user limit 1",
              [],
              (_, { rows: { _array } }) => setUser(_array[0]),
              () => console.log("error fetching")
            );
          });
      }, [flag]);
    
    
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>This is {user?.username || '----'}'s profile.</Text>
        {/* <Text>This account was created on: {user[0].createdOn}.</Text> */}
      </View>
    );
  }