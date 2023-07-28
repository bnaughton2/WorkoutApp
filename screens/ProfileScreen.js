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
        alignContent: 'center'
      },
      nameText:{
        fontSize: 14,
        color: '#F4F5FB',
        paddingTop: '5%'
      },  
      buttonLeft:{

        width: '49%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#0C668D',
        marginBottom: '5%',
        marginRight: '1%',
        fontSize: 16
        },
      buttonRight:{

        width: '49%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#0C668D',
        marginBottom: '5%',
        marginLeft: '1%',
        fontSize: 16
        },
        inputText:{
          color:"#F4F5FB",
          fontSize: 16,
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
            paddingBottom: '5%'
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
            paddingBottom: '5%'
          }}
        />
        <View>
          <Text style={styles.nameTitle}>Account Settings</Text>
          <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: '5%'}}>
            <TouchableOpacity
              style={styles.buttonLeft}
              >
              <Text style={styles.inputText}>Change Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRight}
              >
              <Text style={styles.inputText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }