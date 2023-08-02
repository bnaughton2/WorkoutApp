import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import {View, Text, StyleSheet,Button,TextInput, ImageBackground,TouchableOpacity,Picker } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SQLite from "expo-sqlite";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { init } from '../sqlite.js'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Animated } from "react-native";


export default function ProfileScreen({ navigation, route }) {
    const db = SQLite.openDatabase("workout.db");
    const [user, setUser] = useState(null);
    const [userID, setUserID] = useState(0);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');

    const av = new Animated.Value(0);
    av.addListener(() => {return});

    const styles = StyleSheet.create({
      container:{
        flex: 1, 
        justifyContent: 'top', 
        alignItems: 'center',
        padding: '5%',
        backgroundColor: '#08125d'
      },
      nameTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F4F5FB',
        paddingTop: '2%',

      },
      settingsTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F4F5FB',
        padding: '4%',
      },
      nameText:{
        fontSize: 14,
        color: '#F4F5FB',
        padding: '2%',
        alignItems: 'center'
      },  
      button:{
        width: '100%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#0C668D',
        marginBottom: '5%',
        flexDirection: 'row',
        paddingLeft: '5%'
        },
      inputText:{
        color:"#F4F5FB",
        fontSize: 16,
        justifyContent: 'center'
        },
  });

    useEffect(() => {

      AsyncStorage.getItem('userID', (err, result) => {
        setUserID(JSON.parse(result));
      });
      AsyncStorage.getItem('email', (err, result) => {
        setEmail(JSON.parse(result));
      });
      AsyncStorage.getItem('firstName', (err, result) => {
        setFirstName(JSON.parse(result));
      });
      AsyncStorage.getItem('lastName', (err, result) => {
        setLastName(JSON.parse(result));
      });
      AsyncStorage.getItem('username', (err, result) => {
        setUsername(JSON.parse(result));
      });
      }, [userID, email, firstName, lastName, username]);
    
    
    return (
      <View style={styles.container}>

        <Ionicons name='person-circle-outline' size={60} color={'#F4F5FB'}/>
        <Text style={styles.nameTitle}>{firstName || '----'}'s Profile</Text>
        <View
          style={{
            borderBottomColor: '#F4F5FB',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: '100%',
            padding: '2%'
          }}
        />
        <View>
          <Text style={styles.nameText}>Name: {firstName || '----'} {lastName || '----'}</Text>
        </View>
        <View>
          <Text style={styles.nameText}>Email: {email || '----'}</Text>
        </View>
        <View>
          <Text style={styles.nameText}>DOB: 01/01/2000</Text>
        </View>
        <View
          style={{
            borderBottomColor: '#F4F5FB',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: '100%',
            padding: '2%'
          }}
        />
        <View style={{alignItems: 'center', width: '100%'}}>
          <Text style={styles.settingsTitle}>Account Settings</Text>
          <View style={{flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
          <TouchableOpacity style={styles.button}>
              <Text style={styles.inputText}>Change Email</Text>
              <View style={{marginLeft: 'auto'}}><Ionicons name='chevron-forward-outline' size={25} color={'#F4F5FB'} /></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.inputText}>Change Password</Text>
              <View style={{marginLeft: 'auto'}}><Ionicons name='chevron-forward-outline' size={25} color={'#F4F5FB'} /></View>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }