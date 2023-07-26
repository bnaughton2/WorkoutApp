import React, { useState }  from 'react';
import {View, Text, StyleSheet,Button,TextInput, ImageBackground,TouchableOpacity,Picker } from 'react-native';
import Firebase from '../firebase.js';
import * as SQLite from "expo-sqlite";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated } from "react-native";



//This line is used to prevent yellow errors caused by the firebase in application.
console.disableYellowBox = true;

const SignUp = props => {

  
  const {navigation} = props;

//   const dbh = Firebase.firestore();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirm, setconfirm] = useState('');
  const [username, setUsername] = useState('');

  const av = new Animated.Value(0);
  av.addListener(() => {return});

function handleSignUp(){
  
    if(confirm === password){
      Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => onSuccess())
        .catch(error => alert(error))
    } else{
      alert("Error: Passwords do not match")
    }
}

function onSuccess(){
  insertUserToDB();
  navigation.navigate('Tabs');
}

async function setStorageItem(key, item){
  try{
      await AsyncStorage.setItem(key, item, () => { 
  });
   }catch(e){
      console.log("Error ", e);
   }     
}

function insertUserToDB(){
  const time = new Date().getDate();
  const db = SQLite.openDatabase("workout.db");
  setStorageItem('email', email);
  setStorageItem('pw', password);
  db.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO user (username, email, password, firstName, lastName, createdOn) VALUES (?,?,?,?,?,?)',
      [username, email, password, firstName, lastName, 1111],
      (tx, results) => {
      }
    );
  });
  db.transaction(tx => {
    tx.executeSql(
      "select userID from user WHERE email=? AND password=?",[email,password],
      (_, { rows: { _array } }) => {
        setStorageItem('userID', JSON.stringify(_array[0].userID));
        setStorageItem('firstName', JSON.stringify(_array[0].firstName));
        setStorageItem('lastName', JSON.stringify(_array[0].lastName));
        setStorageItem('username', JSON.stringify(_array[0].username));
      },
      () => console.log("error fetching")
    );
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08125d',
    alignItems: 'center',
    justifyContent: 'top',
    padding: '5%',
    },
title:{
    fontWeight: "bold",
    fontSize:30,
    color:"#F4F5FB",
    marginBottom: '10%',
    },
inputView:{
    width:"80%",
    backgroundColor:"#0C668D",
    borderRadius:15,
    height:40,
    marginBottom:10,
    justifyContent:"center",
    padding:20
    },
nameViewLeft:{
  width:"39%",
  backgroundColor:"#0C668D",
  borderRadius:15,
  height:40,
  marginBottom:10,
  marginRight: '1%',
  justifyContent:"center",
  padding:20
  },
  nameViewRight:{
    width:"39%",
    backgroundColor:"#0C668D",
    borderRadius:15,
    height:40,
    marginBottom:10,
    marginLeft: '1%',
    justifyContent:"center",
    padding:20
    },
row:{
  flexDirection: 'row'
},
inputText:{
    height:50,
    fontSize:14,
    color:"#F4F5FB",
    },
signUpText:{
    color:"#F4F5FB",
    fontSize: 16,
},
signUpButton:{
  marginTop: 10,
  width: 150,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  borderRadius: 40,
  backgroundColor: '#0C668D',
  marginBottom: '5%',
  fontSize: 16
},
xButton: {
  color: "#F4F5FB",
  fontSize: 12,
  fontWeight: 'bold',
  textDecorationLine: 'underline'
}
});

  return (

   <View style={styles.container}>

    <Text style={styles.title}>Create an Account</Text>
    <View style={styles.row} >
    <View style={styles.nameViewLeft} >
      <TextInput  
        style={styles.inputText}
        placeholder="First Name:" 
        placeholderTextColor="#F4F5FB"
        onChangeText={firstName => setFirstName(firstName)}
        defaultValue=""/>
    </View>
    <View style={styles.nameViewRight} >
      <TextInput  
        style={styles.inputText}
        placeholder="Last Name:" 
        placeholderTextColor="#F4F5FB"
        onChangeText={lastName => setLastName(lastName)}
        defaultValue=""/>
    </View>
    </View>
    <View style={styles.inputView} >
      <TextInput  
        style={styles.inputText}
        placeholder="User Name:" 
        placeholderTextColor="#F4F5FB"
        onChangeText={username => setUsername(username)}
        defaultValue=""/>
    </View>
    <View style={styles.inputView} >
      <TextInput  
        style={styles.inputText}
        placeholder="E-mail:" 
        placeholderTextColor="#F4F5FB"
        keyboardType='email-address'
        onChangeText={email => setemail(email)}
        defaultValue={email}/>
    </View>
    <View style={styles.inputView} >
      <TextInput  
        style={styles.inputText}
        placeholder="Password:" 
        placeholderTextColor="#F4F5FB"
        onChangeText={password => setpassword(password)}
        defaultValue={password}/>
    </View>
    <View style={styles.inputView} >
      <TextInput  
        style={styles.inputText}
        placeholder="Confirm Password:" 
        placeholderTextColor="#F4F5FB"
        onChangeText={confirm => setconfirm(confirm)}
        defaultValue={confirm}/>
    </View>
   
     <TouchableOpacity  onPress={handleSignUp} style={styles.signUpButton}>
      <Text style={styles.signUpText}>Sign Up</Text>
    </TouchableOpacity>
   
    </View>
 
  );
  }
  
  export default SignUp;